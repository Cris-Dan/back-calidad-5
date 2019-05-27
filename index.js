require('dotenv').config();

var express = require('express');
var passport = require('passport');
var morgan = require('morgan');
var cookierParser = require('cookie-parser');
var expressSession = require('express-session');
const connectFlash = require('connect-flash');
// Create a new Express application.
var app = express();
require('./database');
require('./passport/auth');
//configs
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cookierParser());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(connectFlash());

//routes.
app.use(require('./routes/alumno'));
app.use(require('./routes/profesor'));
//iniciar
app.listen(app.get('port'), () => {
    console.log("servidor en puerto: " + app.get('port'));
});
