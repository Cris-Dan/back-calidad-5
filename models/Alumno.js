const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const AlumnoSchema = new Schema({

  username: { type: String, required: true },
  password: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  genero:{type:String},
  edad:{type:Number},
  facebookId: { type: String },
  ingresado: { type: Date, default: Date.now() },
  isVerified: { type: Boolean, default: false, required: true },
  createdAt:{type: Date, default:Date.now},
  updateAt:{type:Date}
});

AlumnoSchema.methods.encryptPassword = async (password) => {
  return await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

AlumnoSchema.methods.comparePassword = async (password, password2) => {
  return await bcrypt.compareSync(password, password2);
};

module.exports = model('Alumno', AlumnoSchema);