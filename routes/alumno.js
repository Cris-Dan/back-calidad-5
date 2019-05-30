const { Router } = require('express');
const router = Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const alumnoController = require('../controllers/alumno.controller');

//facebook login
router.get('/login/facebook',
  passport.authenticate('facebook'));

router.get('/return', passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    //esto deberia enviar a un dashboard o yo que se cuando ya esta logeado
    res.json({ mensaje: 'el usuario fue autentificado con exito por fb puede ver sus datos en la ruta profile' });
  });


router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    //Esto se utiliza para verificar los datos del logeado 

    res.json(req.user);
  });

//local login
router.get('/secret-alumno', (req, res) => {
  let mensaje = "";
  req.isAuthenticated() ? mensaje = "Alumno autenticado" : mensaje = "Alumno NO autenticado";
  res.json({ respuesta: mensaje });
});

router.post('/register-alumno', passport.authenticate('local-register-alumno', { failureFlash: true }), (req, res) => {

  if (req.user)
    res.json({ respuesta: 'Email enviado' });

});

router.get('/confirmation/:token', async (req, res) => {

  console.log(req.params.token);
  const userdecode = jwt.decode(req.params.token);
  console.log(userdecode.data.email);
  if (!userdecode)
    res.json({ estado: "Rechazado" });
  else {
    const alumno = await Alumno.findOne({ email: userdecode.data.email });
    if (!alumno)
      res.json({ estado: "Rechazado" });
    else {
      alumno.isVerified = true;
      await alumno.save();
      res.json({ estado: "Aceptado" });
    }

  }
});

router.post('/login-alumno',passport.authenticate('local-login-alumno',{failureRedirect:'/api/failureLogin'}), (req, res,next) => {
  if(req.user)
  {
    console.log(req.user);
    return res.status(200).send({message:'Login Satisfactorio'});
  }
});

/*Amiguitos intenten hacer que las apis devuelvan un mensaje */
/**cuando el login o el registro de alumnos estén erroneos */
/**Ejemplos: mensaje:"Error Login" o algo así XD */
router.get('/failureLogin',(req,res)=>
{
    res.status(401).send({message:'Error Login'});
});
router.get('/logout-alumno', (req, res) => {
  req.logOut();
  res.json({ respuesta: 'Alumno ha cerrado sesion' });
});


router.get('/alumno/obtenerAlumnos',alumnoController.buscarTodo);
router.get('/alumno/:username',alumnoController.buscarPorUsername);
router.put('/alumno/actualizar/:id',alumnoController.actualizar);
router.delete('/alumno/eliminar/:id',alumnoController.eliminar);


module.exports = router;