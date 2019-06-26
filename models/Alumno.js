const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const AlumnoSchema = new Schema({

  username: { type: String, required: true },
  password: { type: String,required:true },
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String,required:true },
  genero:{type:String},
  edad:{type:Number},
  coords:[Number],
  facebookId: { type: String },
  ingresado: { type: Date, default: Date.now() },
  isVerified: { type: Boolean, default: false, required: true },
  createdAt:{type: Date, default:Date.now},
  updateAt:{type:Date},
  historialCursos:[{
    type: Schema.Types.ObjectId,
    ref: 'Curso'
  }],
  usuario:{type:String,default:'Alumno'}
});

AlumnoSchema.methods.encryptPassword = async (password) => {
  return await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};


AlumnoSchema.methods.comparePassword = async (password,hash) => {
  
  return await bcrypt.compare(password,hash);
};

/*AlumnoSchema.methods.comparePassword = async (password) => {
  return await bcrypt.compareSync(password, this.password);
};*/

module.exports = model('Alumno', AlumnoSchema);