const { Router } = require('express');
const router = Router();
const passport = require('passport');
const controller = require('../controllers/profesor.controller');
const jwt = require('jsonwebtoken');
const Profesor = require('../models/Profesor');
router.get('/secret-profesor', (req, res) => {
    let mensaje ="";
    req.isAuthenticated() ? mensaje ="Profesor autenticado" : mensaje = "Profesor NO autenticado";
    res.json({ respuesta: mensaje });
});

router.post('/register-profesor', passport.authenticate('local-register-profesor'), (req, res) => {
    res.json({ respuesta: 'Profesor registrado' });
});

router.post('/login-profesor', passport.authenticate('local-login-profesor',{failureRedirect:'/api/errorLogin'}), (req, res) => {
    res.json({ respuesta: 'Profesor ha iniciado sesion' });
});

router.get('/logout-profesor', (req, res) => {
    req.logout();
    res.json({ respuesta: 'Profesor ha cerrado sesion' });
});

router.get('/profesor/confirmation/:token',async (req,res,next)=>
{
  console.log(req.params.token);
  const userdecode = jwt.decode(req.params.token);
  console.log(userdecode.data.email);
  if (!userdecode)
    return res.render('Rechazado',{titulo:'Error Email | FastTeach'});
  else {
    const profesor = await Profesor.findOne({ email: userdecode.data.email });
    if (!profesor)
      return res.render('Rechazado',{titulo:'Error Email | FastTeach'});//res.json({ estado: "Rechazado" });
    else {
      profesor.isVerified = true;
      await profesor.save();
      return res.render('Confirmado',{titulo:'Email Confirmado | FastTeach'})//res.json({ estado: "Aceptado" });
    }

  }
});

router.get('/errorLogin',(req,res,next)=>
{
    res.status(201).send({message:'Malos credenciales'});
});
router.get('/profesor/verEstadoSolicitud',controller.verEstadoSolicitud);
router.get('/profesor/aceptarSolicitud',controller.aceptarSolicitud);
router.get('/profesor/denegarSolicitud',controller.denegarSolicitud);
router.get('/profesor/solicitar',controller.solicitarProfesor);
router.get('/profesor/buscarTodo',controller.buscarTodos);
router.get('/profesor/buscar/:email',controller.buscarProfesor);
router.put('/profesor/actualizar/:id',controller.actualizarProfesor);
router.delete('/profesor/eliminar/:email',controller.eliminarProfesor);
router.get('/profesor/adjuntarCurso',controller.adjuntarCurso);
router.get('/profesor/quitarCurso',controller.quitarCurso);
router.get('/profesor/buscarTodosCursosProfesor',controller.buscarTodosCursosProfesor);
router.get('/profesor/buscarProfesoresPorCurso',controller.buscarProfesoresPorCurso);
router.get('/profesor/buscarCursosPorProfesor',controller.buscarCursosPorProfesor);
module.exports = router;