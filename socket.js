
//TODO agregar al usuario que esta en sesion
/*
lo que se recibe desde el front debe ser:
 
const datos = {
    coords: e.latlng,
    email: usuario.email
}

para ser adjuntado las coordenadas a su respectivo modelo
*/
const Alumno = require('./models/Alumno');
module.exports = io => {
    io.on('connection', (socket) => {
        socket.on('userCoordinates', async (datos) => {
            try {
                const alumno = await Alumno.findOneAndUpdate({ email: datos.email }, { coords: datos.coords }, { new: true });
                if (alumno) {
                    socket.broadcast.emit(alumno.username, alumno.coords);
                    console.log('usuario: ' + alumno.username + " en posicion :" + alumno.coords);
                }
            } catch (error) {
                console.log(error);
            }

        })
    });
}