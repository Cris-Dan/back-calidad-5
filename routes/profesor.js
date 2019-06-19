const { Router } = require('express');
const router = Router();
const passport = require('passport');
const controller = require('../controllers/profesor.controller');

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

router.get('/errorLogin',(req,res,next)=>
{
    res.status(201).send({message:'Malos credenciales'});
});
router.get('/profesor/verEstadoSolicitud',controller.verEstadoSolicitud);
router.get('/profesor/aceptarSolicitud',controller.aceptarSolicitud);
router.get('/profesor/denegarSolicitud',controller.denegarSolicitud);
router.get('/solicitar',controller.solicitarProfesor);
router.get('/profesor/buscarTodo',controller.buscarTodos);
router.get('/profesor/buscar/:email',controller.buscarProfesor);
router.put('/profesor/actualizar/:id',controller.actualizarProfesor);
router.delete('/profesor/eliminar/:email',controller.eliminarProfesor);


module.exports = router;