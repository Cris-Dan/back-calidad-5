require('dotenv').config();
var http = require('http');
var socketIO = require('socket.io');
var express = require('express');
var passport = require('passport');
var morgan = require('morgan');
var cookierParser = require('cookie-parser');
var expressSession = require('express-session');
const socket = require('./socket');
const cors = require('cors');

const connectFlash = require('connect-flash');



// Create a new Express application.
var app = express();
const server = http.createServer(app);
const io = socketIO(server);
require('./database');
require('./passport/auth');
//configs
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(cookierParser());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(connectFlash());
 
//routes.
app.use('/api',require('./routes/alumno'));
app.use('/api',require('./routes/profesor'));
app.use('/api',require('./routes/curso'));
app.use('/api',require('./routes/logic'));

//sockets
socket(io);


//iniciar
server.listen(app.get('port'), () => {
    console.log("servidor en puerto: " + app.get('port'));
});
