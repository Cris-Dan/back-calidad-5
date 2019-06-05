const Alumno = require('../models/Alumno');
const bcrypt = require('bcrypt');
const emailer = require('../passport/email-confirmation/emailer');
const jwt = require('jsonwebtoken');
module.exports = {

    loginFacebookAlumno: async (accessToken, refreshToken, profile, done) => {

        let alumno = await Alumno.findOne({ facebookId: profile.id });
        if (!alumno) {
            alumno = new Alumno();
            alumno.facebookId = profile.id;
            alumno.username = profile.displayName;
            alumno.isVerified = true;
            console.log(alumno);
            await alumno.save();
        }
        return done(null, alumno);
    },
    registrarAlumno: async (req, username, password, done) => {

        const { email } = req.body;
        const repetido = await Alumno.findOne({ username: username });
        if (repetido) {
            return done(null, false, { message: 'Username Repetido' });
        }
        const emailRepetido = await Alumno.findOne({ email });
        if (emailRepetido) {
            return done(null, false, { message: 'Email Repetido' });
        }
        const alumno = new Alumno();
        alumno.username = username;
        alumno.password = await alumno.encryptPassword(password);
        alumno.firstname = req.body.firstname;
        alumno.lastname = req.body.lastname;
        alumno.email = req.body.email;
        alumno.genero = req.body.genero;
        alumno.edad = req.body.edad;
        await alumno.save();

        emailer(alumno, req);

        return done(null, alumno);
    },
    loginAlumno: async (req, email, password, done) => {
        const alumno = await Alumno.findOne({ email });
        if (!alumno) {
            return done(null, false, { message: "Correo Incorrecto" });
        }

        //Variable smaaaaaaaaaash porque no funciona la cojudez sin exportar
        const smaaaaaaaaaash = await bcrypt.compare(password, alumno.password);

        //Verifica el password del alumno
        if (!smaaaaaaaaaash) {
            return done(null, false, { message: "Password Incorrecto" });
        }//Corrobora la comprobacion del email
        if (alumno.isVerified != true) {
            return done(null, false, { message: "Correo sin confirmar" });
        }
        return done(null, alumno);

    },
    confirmarToken: async (req, res) => {

        console.log(req.params.token);
        const userdecode = jwt.decode(req.params.token);
        console.log(userdecode.data.email);
        if (!userdecode)
            res.json({ estado: "Rechazado" });
        else {
            const alumno = await Alumno.findOne({ email: userdecode.data.email });
            if (!alumno)
                res.json({ estado: "Rechazado" });
            else {
                alumno.isVerified = true;
                await alumno.save();
                res.json({ estado: "Aceptado" });
            }
        }
    },
    // retorna un alumno
    buscarTodo: async (req, res) => {
        try {
            const alumnos = await Alumno.find({});
            if (alumnos != null) {
                res.send(alumnos);
            } else {
                res.send({ message: 'no se encontraron alumnos' });
            }

        } catch (e) {
            res.send({ message: 'no se encontraron alumnos' });
        }
    },
    buscarPorUsername: async (req, res) => {
        const { username } = req.params;
        console.log(username);
        try {
            const existeAlumno = await Alumno.findOne({ username });
            if (existeAlumno != null) {
                res.send(existeAlumno);

            } else {
                res.send({ message: 'no se encontro al alumno' });
            }

        } catch (e) {
            res.send({ message: 'no se encontro al alumno' });
        }
    },

    //retorna el valor anterior a la actualizacion
    actualizar: async (req, res) => {
        const { id } = req.params;
        try {
            const alumnoExiste = await Alumno.findOne({ _id: id });
            if (alumnoExiste) {
                const alumno = {};
                alumno.username = req.body.username;
                if (req.body.password != null && !alumnoExiste.comparePassword(req.body.password, alumnoExiste.password)) {
                    alumno.password = await alumno.encryptPassword(req.body.password);
                }
                alumno.firstname = req.body.firstname;
                alumno.lastname = req.body.lastname;
                alumno.email = req.body.email;
                alumno.edad = req.body.edad;
                alumno.genero = req.body.genero;
                Alumno.findOneAndUpdate({ _id: alumnoExiste._id }, alumno, { new: true }).then((alumno) => {
                    res.send({ message: 'se actualizo con exito.', alumno });
                }).catch((err) => {
                    throw new Error(err);
                });
            } else {
                res.send({ message: "No se encontro al alumno" });
            }
        } catch (e) {
            res.send({ message: "No se encontro al alumno" });
        }
    },
    //retorna el alumno eliminado
    eliminar: async (req, res) => {
        const { id } = req.params;
        try {
            const alumnoExiste = await Alumno.findOne({ _id: id });
            console.log(alumnoExiste);
            if (alumnoExiste) {

                Alumno.findOneAndRemove(alumnoExiste._id).then((alumno) => {
                    res.send({ message: 'se elimino al alumno con exito.', alumno });
                }).catch((err) => {
                    throw new Error(err);
                });
            } else {
                res.send({ message: "No se encontro al alumno" });
            }
        } catch (e) {
            res.send({ message: "No se encontro al alumno" });
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
