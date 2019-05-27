var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const Alumno = require('../models/Alumno');
const Profesor = require('../models/Profesor');
const emailer = require('./email-confirmation/emailer');

passport.serializeUser(function (user, cb) {
    //Alumno.findOrCreate({ facebookId: profile.id });
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});


/*passport.serializeUser((alumno, done) => {
    done(null, alumno._id);
});

passport.deserializeUser(async (_id, done) => {
    const alumno = await Alumno.findById(_id);
    done(null, alumno);
});*/

//facebook
passport.use(new Strategy({
    clientID: process.env['FACEBOOK_CLIENT_ID'],
    clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
    callbackURL: '/return'
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }));


//local
passport.use('local-register-alumno', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    const { email } = req.body;
    const repetido = await Alumno.findOne({ username: username });

    if (repetido) {
        return done(null, false, { message: 'Username Repetido' });
    }

    const emailRepetido = await Alumno.findOne({ email });
    if (emailRepetido) {
        return done(null, false, { message: 'Email Repetido' });
    }

    const alumno = new Alumno();
    alumno.username = username;
    alumno.password = await alumno.encryptPassword(password);
    alumno.firstname = req.body.firstname;
    alumno.lastname = req.body.lastname;
    alumno.email = req.body.email;
    await alumno.save();

    emailer(alumno, req);

    return done(null, alumno);

}));

passport.use('local-login-alumno', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const alumno = await Alumno.findOne({ email });
    if (!alumno) {
        return done(null, false, { message: "Correo Incorrecto" });
    }
    //Verifica el password del alumno
    if (!alumno.comparePassword(password, alumno.password)) {
        return done(null, false, { message: "Password Incorrecto" });
    }//Corrobora la comprobacion del email
    if (alumno.isVerified != true) {
        return done(null, false, { message: "Correo sin confirmar" });
    }
    return done(null, alumno);

}));

passport.use('local-register-profesor', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    const { email } = req.body;
    const repetido = await Profesor.findOne({ username: username });

    if (repetido) {
        return done(null, false);
    }

    const emailRepetido = await Profesor.findOne({ email });
    if (emailRepetido) {
        return done(null, false);
    }

    const profesor = new Profesor();
    profesor.username = username;
    profesor.password = await profesor.encryptPassword(password);
    profesor.firstname = req.body.firstname;
    profesor.lastname = req.body.lastname;
    profesor.email = req.body.email;
    await profesor.save();

    return done(null, profesor);

}));

passport.use('local-login-profesor', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const profesor = await Profesor.findOne({ username: username });
    if (!profesor) {
        return done(null, false, { message: 'Profesor no encontrado.' });
    }
    if (!profesor.comparePassword(password, profesor.password)) {
        return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, profesor);

}));