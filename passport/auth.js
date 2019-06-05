var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const alumnoController = require('../controllers/alumno.controller');
const profesorController = require('../controllers/profesor.controller');
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));
//facebook alumno
passport.use(new FacebookStrategy({
    clientID: process.env['FACEBOOK_CLIENT_ID'],
    clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
    callbackURL: '/return'
}, alumnoController.loginFacebookAlumno));
//local alumno
passport.use('local-register-alumno', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, alumnoController.registrarAlumno));

passport.use('local-login-alumno', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, alumnoController.loginAlumno));
//local profesor
passport.use('local-register-profesor', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, profesorController.registrarProfesor));

passport.use('local-login-profesor', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, profesorController.loginProfesor));