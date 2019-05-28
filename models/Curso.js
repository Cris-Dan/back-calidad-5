const { Schema, model } = require('mongoose');

const CursoSchema = new Schema({
    nombre: { type: String, required: true },
    marco:{type:String, required:true},
    veces_solicitado:{type:Number},
    creadeAt:{type:Date,default:Date.now},
    updateAt:Date
});
module.exports = model('Curso', CursoSchema);