const Alumno = require('../models/Alumno');

module.exports = {

    // retorna un alumno
    buscarTodo: async (req, res) => {
        try {
            const alumnos = await Alumno.find({});
            if (alumnos != null) {
                res.send(alumnos);
            } else {
                res.send({message: 'no se encontraron alumnos'});
            }

        } catch (e) {
            res.send({message: 'no se encontraron alumnos'});
        }
    },
    buscarPorUsername: async (req, res) => {
        const {username} = req.params;
        console.log(username);
        try {
            const existeAlumno = await Alumno.findOne({username});
            if (existeAlumno != null) {
                res.send(existeAlumno);

            } else {
                res.send({message: 'no se encontro al alumno'});
            }

        } catch (e) {
            res.send({message: 'no se encontro al alumno'});
        }
    },

    //retorna el valor anterior a la actualizacion
    actualizar: async (req, res) => {
        const {id} = req.params;
        try {
            const alumnoExiste = await Alumno.findOne({_id: id});
            if (alumnoExiste) {
                const alumno = {};
                alumno.username = req.body.username;
                if (req.body.password != null && !alumnoExiste.comparePassword(req.body.password, alumnoExiste.password)) {
                    alumno.password = await alumno.encryptPassword(req.body.password);
                }
                alumno.firstname = req.body.firstname;
                alumno.lastname = req.body.lastname;
                alumno.email = req.body.email;

                Alumno.findOneAndUpdate({_id: alumnoExiste._id}, alumno, {new: true}).then((alumno) => {
                    res.send({message: 'se actualizo con exito.', alumno});
                }).catch((err) => {
                    throw new Error(err);
                });
            } else {
                res.send({message: "No se encontro al alumno"});
            }
        } catch (e) {
            res.send({message: "No se encontro al alumno"});
        }
    },
    //retorna el alumno eliminado
    eliminar: async (req, res) => {
        const {id} = req.params;
        try {
            const alumnoExiste = await Alumno.findOne({_id: id});
            console.log(alumnoExiste);
            if (alumnoExiste) {

                Alumno.findOneAndRemove(alumnoExiste._id).then((alumno) => {
                    res.send({message: 'se elimino al alumno con exito.', alumno});
                }).catch((err) => {
                    throw new Error(err);
                });
            } else {
                res.send({message: "No se encontro al alumno"});
            }
        } catch (e) {
            res.send({message: "No se encontro al alumno"});
        }
    }

    /*// retorna un alumno
    buscarPorEmail: async (email) => {
        return await Alumno.findOne({email});
    },
    // retorna un array de alumnos
    buscarPorNombre: async (firstname) => {
        return await Alumno.find({firstname});
    },
    // retorna un alumno
    buscarPorId: async (req, res) => {

        return await Alumno.findById(_id);
    },*/
}
