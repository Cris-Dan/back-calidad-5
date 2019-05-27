const Alumno = require('../models/Alumno');

module.exports = {
    // retorna un alumno
    buscarPorEmail: async (email) => {
        return await Alumno.findOne({email});
    },
    // retorna un array de alumnos
    buscarPorNombre: async (firstname) => {
        return await Alumno.find({firstname});
    },
    // retorna un alumno
    buscarPorUsername: async (username) => {
        return await Alumno.findOne({username});
    },
    // retorna un alumno
    buscarPorId: async (_id) => {
        return await Alumno.findById(_id);
    },
    //retorna el valor anterior a la actualizacion
    actualizar: async (alumno) => {
        return await Alumno.findOneAndUpdate(alumno._id, alumno);
    },
    //retorna el alumno eliminado
    eliminar: async (alumno) => {
        return await Alumno.findOneAndRemove(alumno._id);
    }
}
