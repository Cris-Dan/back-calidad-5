const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const ProfesorSchema = new Schema({

  username: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  cursos: {
    type: [Schema.Types.ObjectId],
    ref: 'Curso'
  },
  vecesDictado: { type: Number, default: 0 },
  calificacion: { type: Number },
  email: { type: String, required: true },
  genero:{type:String},
  edad:{type:Number},
  ingresado: { type: Date, default: Date.now() },
  isVerified:{ type:Boolean,default:false}
});

ProfesorSchema.methods.encryptPassword = async (password) => {
  return await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

ProfesorSchema.methods.comparePassword = async (password, password2) => {
  return await bcrypt.compareSync(password, password2);
};

module.exports = model('Profesor', ProfesorSchema);