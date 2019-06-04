const Alumno = require('../models/Alumno');
const Profesor = require('../models/Profesor');
const Curso = require('../models/Curso');


exports.profesor_ordenado_por_edad = async (req,res,next)=>
{
    
    const profesores = await Profesor.find({}).sort({edad:1});
    

    if(!profesores)
    {
        return res.status(206).send({message:'No existen profesores'});     
    }
    return res.status(200).send(profesores);
}
exports.profesor_ordenado_por_cercania = async (req,res,next)=>
{
    
}
exports.profesor_ordenado_por_sexo_femenino = async (req,res,next)=>
{
    const profesores = await Profesor.find({}).sort({genero:1});
    
    if(!profesores)
    {
        return res.status(206).send({message:'No existen profesores'});     
    }
    return res.status(200).send(profesores);      
}
exports.profesor_ordenado_por_sexo_masculino = async (req,res,next)=>
{
    const profesores = await Profesor.find({}).sort({genero:-1});
    
    if(!profesores)
    {
        return res.status(206).send({message:'No existen profesores'});     
    }
    return res.status(200).send(profesores);
}
exports.alumno_ordenado_por_edad = async(req,res,next)=>
{
    const alumnos = await Alumno.find({}).sort({edad:1});
    
    if(!alumnos)
    {
        return res.status(206).send({message:'No existen alumnos'});     
    }
    return res.status(200).send(alumnos);
}
exports.alumno_ordenado_por_sexo_masculino = async(req,res,next)=>{
    
    const alumnos = await Alumno.find({}).sort({genero:-1});
    if(!alumnos)
    {
        return res.status(206).send({message:'No existen alumnos'});     
    }
    return res.status(200).send(alumnos);
}
exports.alumno_ordenado_por_sexo_femenino = async(req,res,next)=>
{
    const alumnos = await Alumno.find({}).sort({genero:1});
    
    if(!alumnos)
    {
        return res.status(206).send({message:'No existen alumnos'});     
    }
    return res.status(200).send(alumnos);
}
exports.curso_por_marco = async (req,res,next)=>
{

}
exports.ordenar_curso_por_mas_frecuencia = async(req,res,next)=>
{

}