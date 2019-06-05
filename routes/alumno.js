const { Router } = require('express');
const router = Router();
const passport = require('passport');
const alumnoController = require('../controllers/alumno.controller');
const connectEnsureLogin = require('connect-ensure-login');

router.get('/secret-alumno', (req, res) => {
  let mensaje = "";
  req.isAuthenticated() ? mensaje = "Alumno autenticado" : mensaje = "Alumno NO autenticado";
  res.status(200).json({ respuesta: mensaje });
});
router.post('/register-alumno', passport.authenticate('local-register-alumno', { failureFlash: true }),
  (req, res) => {
    if (req.user) res.json({ respuesta: 'Email enviado' })
  });
router.post('/login-alumno', passport.authenticate('local-login-alumno', { failureRedirect: '/api/failureLogin' }), (req, res) => {
  if (req.user) return res.status(200).send({ message: 'Login Satisfactorio' })
});
router.get('/login/facebook', passport.authenticate('facebook'));
router.get('/return', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.json({ mensaje: 'el usuario fue autentificado con exito por fb puede ver sus datos en la ruta profile' });
});
router.get('/profile', connectEnsureLogin.ensureLoggedIn(), (req, res) => res.status(200).json(req.user));
router.get('/confirmation/:token', alumnoController.confirmarToken);
router.get('/alumno/obtenerAlumnos', alumnoController.buscarTodo);
router.get('/alumno/:username', alumnoController.buscarPorUsername);
router.put('/alumno/actualizar/:id', alumnoController.actualizar);
router.delete('/alumno/eliminar/:id', alumnoController.eliminar);
router.get('/failureLogin', (req, res) => res.status(401).send({ message: 'Error Login' }));
router.get('/logout-alumno', (req, res) => {
  req.logOut();
  res.json({ respuesta: 'Alumno ha cerrado sesion' });
});

module.exports = router;