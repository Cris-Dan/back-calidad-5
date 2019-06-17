const Profesor = require('../models/Profesor');

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
            profesor.username = req.body.username;
            if (req.body.password != null && !profesorExiste.comparePassword(req.body.password, profesorExiste.password)) {
                profesor.password = await profesor.encryptPassword(req.body.password);
            }
            profesor.firstname = req.body.firstname;
            profesor.lastname = req.body.lastname;
            profesor.email = req.body.email;
            profesor.edad = req.body.edad;
            profesor.genero = req.body.genero;
            Profesor.findOneAndUpdate({ _id: profesorExiste._id }, profesor, { new: true }).then((profesor) => {
                res.status(200).send({ message: 'se actualizo con exito.', profesor });
            }).catch((err) => {
                throw new Error(err);
            });
        } else {
            res.status(400).send({ message: "No se encontro al profesor" });
        }
    } catch (e) {
        res.status(401).send({ message: "No se encontro al profesor" });
    }
}
exports.solicitarProfesor = async (req, res) => {

    const { idALumno, idProfesor } = req.body;
    const profesor = await Profesor.findOne({ _id: idProfesor });
    if (profesor) {
        var solicitud = { alumno: idALumno }
        profesor.solicitudes.push(solicitud);
        await profesor.save();
        res.status(200).send({ message: 'solicitud completada.' });
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
        res.status(200).send({ message: 'solicitud denegada.' });
    } else {
        res.status(400).send({ message: 'no existe el profesor.' });
    }
}
exports.aceptarSolicitud = async (req, res) => {
    const { idAlumno, idProfesor } = req.body;
    var solicitudAnterior = { alumno: idAlumno, aceptado: false }
    var solicitudAceptada = { alumno: idAlumno, aceptado: true }
    const profesor = await Profesor.findOne({ _id: idProfesor });
    if (profesor) {
        var index = profesor.solicitudes.indexOf(solicitudAnterior);
        profesor.solicitudes.splice(index, 1, solicitudAceptada);
        await profesor.save();
        res.status(200).send({ message: 'solicitud aceptada.' });
    } else {
        res.status(400).send({ message: 'no existe el profesor.' });
    }

}