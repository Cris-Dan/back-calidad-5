var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const Alumno = require('../models/Alumno');
const Profesor = require('../models/Profesor');
const emailer = require('./email-confirmation/emailer');

const bcrypt = require('bcrypt');

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (user, cb) {
    cb(null, user);
});


/*passport.serializeUser((alumno, done) => {
    done(null, alumno._id);
});

passport.deserializeUser(async (_id, done) => {
    const alumno = await Alumno.findById(_id);
    done(null, alumno);
});*/

//facebook
passport.use(new FacebookStrategy({
    clientID: process.env['FACEBOOK_CLIENT_ID'],
    clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
    callbackURL: '/return'
}, async (accessToken, refreshToken, profile, done) => {

    let alumno = await Alumno.findOne({ facebookId: profile.id });
    if (!alumno) {
        alumno = new Alumno();
        alumno.facebookId = profile.id;
        alumno.username = profile.displayName;
        alumno.isVerified = true;
        console.log(alumno);
        await alumno.save();
    }
    return done(null, alumno);
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
    alumno.genero = req.body.genero;
    alumno.edad = req.body.edad;
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
   
    //Variable smaaaaaaaaaash porque no funciona la cojudez sin exportar
    const smaaaaaaaaaash = await bcrypt.compare(password,alumno.password);

    //Verifica el password del alumno
    if (!smaaaaaaaaaash) {       
        return done(null, false, { message: "Password Incorrecto" });
    }//Corrobora la comprobacion del email
    if (alumno.isVerified != true) {
        return done(null, false, { message: "Correo sin confirmar" });
    }
    return done(null, alumno);

}));

passport.use('local-register-profesor', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    
    const emailRepetido = await Profesor.findOne({ email });
    
    if (emailRepetido) {
        return done(null, false);
    }
    const {username}  =req.body;
    const usuarioRepetido = await Profesor.findOne({ username });
    if (usuarioRepetido) {
        return done(null, false);
    }
    const profesor = new Profesor();
    profesor.email = email;
    profesor.password = await profesor.encryptPassword(password);
    profesor.firstname = req.body.firstname;
    profesor.lastname = req.body.lastname;
    profesor.username = req.body.username;
    profesor.genero= req.body.genero;
    profesor.edad=req.body.edad;
    await profesor.save();
    
    return done(null, profesor);

}));

passport.use('local-login-profesor', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const profesor = await Profesor.findOne({ email });
    if (!profesor) {
        return done(null, false, { message: 'Profesor no encontrado.' });
    }

    //Verificando el encryptado del password con bcrypt
    const smaaaaaaaaaash = await bcrypt.compare(password,profesor.password);
    if (!smaaaaaaaaaash) {
        return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, profesor);

}));