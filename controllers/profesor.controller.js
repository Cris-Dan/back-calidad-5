const Profesor = require('../models/Profesor');
const bcrypt = require('bcrypt');
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

exports.registrarProfesor = async (req, email, password, done) => {


    const emailRepetido = await Profesor.findOne({ email });

    if (emailRepetido) {
        return done(null, false);
    }
    const { username } = req.body;
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
    profesor.genero = req.body.genero;
    profesor.edad = req.body.edad;
    await profesor.save();

    return done(null, profesor);

}

exports.loginProfesor = async (req, email, password, done) => {
    const profesor = await Profesor.findOne({ email });
    if (!profesor) {
        return done(null, false, { message: 'Profesor no encontrado.' });
    }

    //Verificando el encryptado del password con bcrypt
    const smaaaaaaaaaash = await bcrypt.compare(password, profesor.password);
    if (!smaaaaaaaaaash) {
        return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, profesor);

}