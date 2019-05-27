const { Router } = require('express');
const router = Router();
const passport = require('passport');

router.get('/secret-profesor', (req, res) => {
    let mensaje ="";
    req.isAuthenticated() ? mensaje ="Profesor autenticado" : mensaje = "Profesor NO autenticado";
    res.json({ respuesta: mensaje });
});

router.post('/register-profesor', passport.authenticate('local-register-profesor'), (req, res) => {
    res.json({ respuesta: 'Profesor registrado' });
});

router.post('/login-profesor', passport.authenticate('local-login-profesor'), (req, res) => {
    res.json({ respuesta: 'Profesor ha iniciado sesion' });
});

router.get('/logout-profesor', (req, res) => {
    req.logout();
    res.json({ respuesta: 'Profesor ha cerrado sesion' });
});

module.exports = router;