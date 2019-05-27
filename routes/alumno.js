const { Router } = require('express');
const router = Router();
const passport = require('passport');
router.get('/login/facebook',
  passport.authenticate('facebook'));

  router.get('/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
      //esto deberia enviar a un dashboard o yo que se cuando ya esta logeado
    res.json(req.user);
  });

  router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    //Esto se utiliza para verificar los datos del logeado 
    res.json(req.user);
  });


module.exports = router;