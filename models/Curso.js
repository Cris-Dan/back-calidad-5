const { Schema, model } = require('mongoose');

const CursoSchema = new Schema({
    nombre: { type: String, required: true }

});
module.exports = model('Curso', CursoSchema);