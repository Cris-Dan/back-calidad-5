const Alumno = require('../models/Alumno');

module.exports = {

    // retorna un alumno
    buscarTodo: async (req, res) => {
        try {
            const alumnos = await Alumno.find({});
            if (alumnos != null) {
                res.status(200).send(alumnos);
            } else {
                res.status(206).send({ message: 'no se encontraron alumnos' });
            }

        } catch (e) {
            res.status(304).send({ message: 'no se encontraron alumnos' });
        }
    },
    buscarPorCodigo: async(req,res) => {
        
        const alumno = await Alumno.findOne({_id:req.params.idAlumno});
        if(!alumno)
            return res.status(206).send({message:"GAAAAAAAAA"});
        else
            return res.status(200).send(alumno);

    },
    buscarPorEmail: async (req, res) => {
        const { email } = req.params;
        console.log(email);
        try {
            const existeAlumno = await Alumno.findOne({ email });
            if (existeAlumno != null) {
                res.status(200).send(existeAlumno);

            } else {
                res.status(206).send({ message: 'no se encontro al alumno' });
            }

        } catch (e) {
            res.status(304).send({ message: 'no se encontro al alumno' });
        }
    },

    //retorna el valor anterior a la actualizacion
    actualizar: async (req, res) => {
        const { id } = req.params;
        try {
            const alumnoExiste = await Alumno.findOne({ _id: id });
            if (alumnoExiste) {
                const alumno = {};
                if (req.body.username != null) alumno.username = req.body.username;
                if (req.body.password != null && !alumnoExiste.comparePassword(req.body.password, alumnoExiste.password)) {
                    alumno.password = await alumno.encryptPassword(req.body.password);
                }
                if (req.body.firstname != null) alumno.firstname = req.body.firstname;
                if (req.body.lastname != null) alumno.lastname = req.body.lastname;
                if (req.body.email != null) alumno.email = req.body.email;
                if (req.body.edad != null) alumno.edad = req.body.edad;
                if (req.body.genero != null) alumno.genero = req.body.genero;
                Alumno.findOneAndUpdate({ _id: alumnoExiste._id }, alumno, { new: true }).then((alumno) => {
                    res.status(200).send({ message: 'se actualizo con exito.', alumno });
                }).catch((err) => {
                    throw new Error(err);
                });
            } else {
                res.status(206).send({ message: "No se encontro al alumno" });
            }
        } catch (e) {
            res.status(304).send({ message: "No se encontro al alumno" });
        }
    },
    //retorna el alumno eliminado
    eliminar: async (req, res) => {
        const { id } = req.params;
        
        const alumno = await Alumno.findOneAndDelete({_id:id});

        if(!alumno)
        {
            return res.status(206).send({message:'FAILED'});
        }
        
        console.log(alumno);
        
        return res.status(200).send({message:'OK'})
        
/*
        Alumno.findOneAndDelete({ _id:id })
            .then(alumno => {
                if (!alumno) {
                    return res.status(404).send({
                        message: "No se encontro alumno con nombre " + alumno.nombre
                    });
                }
                return res.status(200).send({ message: "Alumno eliminado" });
            }).catch(err => {
                return res.status(404).send({
                    message: "No se encontro curso con nombre " + alumno.nombre
                });
            });
*/
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
