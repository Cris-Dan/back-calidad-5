const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const ProfesorSchema = new Schema({

    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    cursos:
        [{
            curso: {
                type: Schema.Types.ObjectId,
                ref: 'Curso'
            }
        }],
    solicitudes:
        [{
            alumno: {
                type: Schema.Types.ObjectId,
                ref: 'Alumno'
            },
            emailAlumno:String,
            firstnameAlumno:String,
            lastnameAlumno:String,
            aceptado: { type: Boolean, default: false }
        }],
    vecesDictado: { type: Number, default: 0 },
    calificacion: { type: Number },
    email: { type: String, required: true },
    genero: { type: String, required: true },
    edad: { type: Number, required: true },
    gradoAcademico: { type: String },
    ingresado: { type: Date, default: Date.now() },
    isVerified: { type: Boolean, default: false },
    usuario: { type: String, default: 'Profesor' },
    curso: { type: String }
});

ProfesorSchema.methods.encryptPassword = async (password) => {
    return await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

ProfesorSchema.methods.comparePassword = async (password, password2) => {
    return await bcrypt.compareSync(password, password2);
};

module.exports = model('Profesor', ProfesorSchema);