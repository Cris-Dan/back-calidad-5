const { Schema, model } = require('mongoose');

const CursoProfesorSchema = new Schema({
    idCurso: {
        type: Schema.Types.ObjectId,
        ref: 'Curso'
    },
    idProfesor: {
        type: Schema.Types.ObjectId,
        ref: 'Profesor'
    },
    creadeAt: { type: Date, default: Date.now }
});
module.exports = model('CursoProfesor', CursoProfesorSchema);