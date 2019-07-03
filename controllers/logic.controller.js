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
exports.obtener_marcos = async (req,res,next)=>
{
    const Sanmarcos = await Curso.distinct("marco");
    
    if(Sanmarcos.length==0){
        return res.status(206).send({message:"No hay cursos con marcos"});
    }
    console.log(Sanmarcos);
    return res.status(200).send(Sanmarcos);
};
exports.curso_por_marco = async (req,res,next)=>
{

    const {marco}  = req.params;
    const curso_por_marco = await Curso.find({marco});

    if(curso_por_marco.length==0)
    {
        return res.status(206).send({message:'No hay cursos para ese marco'});
    }
    return res.status(200).send(curso_por_marco);
        
}
exports.ordenar_curso_por_mas_frecuencia = async(req,res,next)=>
{
    const cursos_ordenados = await Curso.find({}).sort({veces_solicitado:-1});
    
    if(cursos_ordenados.length==0)
    {
        return res.status(206).send({message:'No hay curso con este nombre'});
    }
    return res.status(200).send(cursos_ordenados);
}
exports.ordenar_profesor_por_mas_dictado = async(req,res)=>
{
    
        const profesores_mas_solicitados=  await Profesor.find({}).sort({vecesDictado:-1});
        if(profesores_mas_solicitados.length==0)
        {
            return res.status(206).send({message:'No hay profesores'});
        }
        return res.status(200).send(profesores_mas_solicitados);   
    
};
exports.ordenar_profesor_por_mas_dictado_curso = async(req,res)=>
{
    const {curso} = req.params;
    const profesores_por_mas_dictado_curso = await Profesor.find({curso}).sort({});

    if(profesores_por_mas_dictado_curso.length==0)
    {
        return res.status(206).send({message:'No hay profesores para el curso'});
    }
    return res.status(200).send(profesores_por_mas_dictado_curso);
}
exports.cursosTop= async(req,res)=>
{
    const cursos = await Curso.find({}).limit(5).sort({veces_solicitado:-1});

    if(cursos.length==0)
    {
        return res.status(206).send({message:'No hay cursos'});
    }
    return res.status(200).send(cursos);
}

exports.agregarCursoAProfesor =  async (req,res,next)=>
{
    const {idCurso} = req.body;
    const {idProfesor} = req.body;

    const profesor = await Profesor.find({_id:idProfesor});
    console.log(profesor);
    if(profesor)
    {
        var inscripcion  = {curso:idCurso};
        console.log(inscripcion);
        profesor.curso.push(inscripcion);
        await profesor.save();
        return res.status(200).send({message:'OK'});
    }else{
        return res.status(206).send({message:'ERROR'});
    }
    

};
exports.buscar_profesor_por_curso = async (req,res,next)=>
{
    const {nombre} = req.params;
    const profesores =await Profesor.find({curso:nombre});
    
    if(profesores.length==0)
    {
        return res.status(206).send({message:"No hay profesores inscritos en el curso"});
    }else{
        return res.status(200).send(profesores);
    }
}