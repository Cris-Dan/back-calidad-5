const Profesor = require('../models/Profesor');
const CursoProfesor = require('../models/CursoProfesor');

exports.buscarProfesor = async (req, res, next) => {
    const { email } = req.params;
    const profesor = await Profesor.findOne({ email });
    if (!profesor) {
        return res.status(400).send({ message: 'Profesor no existe' });
    } else
        return res.status(200).send(profesor);
}
exports.eliminarProfesor = async (req, res, next) => {
    const { email } = req.params;
    Profesor.findOneAndDelete({ email })
        .then(profesor => {
            if (!profesor) {
                return res.status(404).send({
                    message: "Profesor con email " + email + " no encontrado"
                });
            }
            return res.status(200).send({ message: "profesor eliminado" });
        }).catch(err => {
            return res.status(500).send({
                message: "Error de servidor "
            });
        });
}
exports.buscarTodos = async (req, res, next) => {
    Profesor.find()
        .then(profesores => {
            return res.status(200).send(profesores);
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Error de Servidor"
            });
        });
}
exports.actualizarProfesor = async (req, res, next) => {
    const { id } = req.params;
    try {
        const profesorExiste = await Profesor.findOne({ _id: id });
        if (profesorExiste) {
            const profesor = {};
            if(req.body.username!=null)profesor.username = req.body.username;
            if (req.body.password != null && !profesorExiste.comparePassword(req.body.password, profesorExiste.password)) {
                profesor.password = await profesor.encryptPassword(req.body.password);
            }
            if(req.body.firstname!=null)profesor.firstname = req.body.firstname;
            if(req.body.lastname!=null) profesor.lastname = req.body.lastname;
            if(req.body.email!=null)profesor.email=req.body.email
            if(req.body.edad!=null)profesor.edad = req.body.edad;
            if(req.body.genero!=null)profesor.genero = req.body.genero;
            if(req.body.curso!=null)profesor.curso= req.body.curso;
            Profesor.findOneAndUpdate({ _id: profesorExiste._id }, profesor, { new: true }).then((profesor) => {
                return res.status(200).send({ message: 'se actualizo con exito.', profesor });
            }).catch((err) => {
                throw new Error(err);
            });
        } else {
            return res.status(400).send({ message: "No se encontro al profesor" });
        }
    } catch (e) {
        return res.status(401).send({ message: "No se encontro al profesor" });
    }
}

exports.solicitarProfesor = async (req, res) => {

    const { idALumno, idProfesor } = req.body;
    const profesor = await Profesor.findOne({ _id: idProfesor });
    if (profesor) {
        var solicitud = { alumno: idALumno };
        profesor.solicitudes.push(solicitud);
        await profesor.save();
        res.status(200).send({ message: 'OK' });
    } else {
        res.status(400).send({ message: 'no existe el profesor.' });
    }
}
exports.denegarSolicitud = async (req, res) => {
    const { idAlumno, idProfesor } = req.body;
    var solicitud = { alumno: idAlumno, aceptado: false }
    const profesor = await Profesor.findOne({ _id: idProfesor });
    if (profesor) {
        var index = profesor.solicitudes.indexOf(solicitud);
        profesor.solicitudes.splice(index, 1);
        await profesor.save();
        res.status(200).send({ message: 'OK' });
    } else {
        res.status(400).send({ message: 'no existe el profesor.' });
    }
}
exports.aceptarSolicitud = async (req, res) => {
    const { idAlumno, idProfesor } = req.body;
    var solicitud = { alumno: idAlumno, aceptado: false }
    const profesor = await Profesor.findOne({ _id: idProfesor });
    if (profesor) {
        profesor.solicitudes.find((solicitud) => {
            if (solicitud.idALumno == idAlumno) {
                solicitud.aceptado = true;
            }
        });
        profesor.vecesDictado = profesor.vecesDictado + 1;
        await profesor.save();
        res.status(200).send({ message: 'OK' });
    } else {
        res.status(400).send({ message: 'no existe el profesor.' });
    }
}

exports.verEstadoSolicitud = async (req, res) => {
    const { idAlumno, idProfesor } = req.body;
    const profesor = await Profesor.findOne({ _id: idProfesor });
    if (profesor) {
        const sol = profesor.solicitudes.find((solicitud) => {
            return solicitud.idALumno == idAlumno;
        })
        if (sol.aceptado) {
            res.status(200).send({ message: 'OK' });
        } else {
            res.status(200).send({ message: 'solicitud denegada.' });
        }
    } else {
        res.status(400).send({ message: 'no existe el profesor.' });
    }
}
exports.adjuntarCurso = async (req, res) => {
    const { idProfesor, idCurso } = req.body;
    const existe = await CursoProfesor.findOne({ idProfesor: idProfesor, idCurso: idCurso });
    console.log(existe);
    if (existe) {
        return res.status(400).send({ message: 'ya existe este profesor en el curso' });
    }
    const cursoProfesor = new CursoProfesor();
    cursoProfesor.idProfesor = idProfesor;
    cursoProfesor.idCurso = idCurso;
    await cursoProfesor.save();
    return res.status(200).send({ message: 'OK' });

}
exports.quitarCurso = async (req, res) => {
    const { idProfesor, idCurso } = req.body;
    const existe = await CursoProfesor.findOneAndDelete({ idProfesor: idProfesor, idCurso: idCurso });
    console.log(existe);
    if (existe) {
        return res.status(200).send({ message: 'OK' });
    } else {
        return res.status(400).send({ message: "quien sabe que salio mal" });
    }

}
exports.buscarTodosCursosProfesor = async (req, res) => {
    CursoProfesor.find()
        .then(cursoProfesor => {
            return res.status(200).send(cursoProfesor);
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Error de Servidor"
            });
        });
}
exports.buscarCursosPorProfesor = async (req, res) => {
    const cpp = await CursoProfesor.find({ idProfesor: req.body.idProfesor });
    if (cpp) {
        return res.status(200).send(cpp);
    } else {
        return res.status(404).send({ message: "no se encontro nadita uwu" });
    }
}
exports.buscarProfesoresPorCurso = async (req, res) => {
    const ppc = await CursoProfesor.find({ idCurso: req.body.idCurso });
    if (ppc) {
        return res.status(200).send(ppc);
    } else {
        return res.status(404).send({ message: "no se encontro nadita uwu" });
    }
}