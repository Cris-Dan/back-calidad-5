module.exports = io => {
    io.on('connection', (socket) => {
        console.log('new user connected');
        socket.on('userCoordinates',coords =>{
            //TODO agregar al usuario que esta en sesion
            
            console.log(coords);
        })
    });

}