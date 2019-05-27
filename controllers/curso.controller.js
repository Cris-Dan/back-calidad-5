const Curso = require('../models/Curso');

exports.crearCurso = async (req,res)=>
{
    const {nombre} = req.body;

    const curso = await Curso.findOne({nombre});
    if(curso)
    {
        res.status(400).send({Error:'Curso Existente'}); 
    }else{
        const newCurso = new Curso({});
        newCurso.nombre=req.body.nombre;
        newCurso.marco=req.body.marco;

        await newCurso.save();
        res.status(200).send({Mensaje:'Creado'});
    }
};
exports.actualizarCurso = async(req,res)=>
{

    const {nombre} = req.params;

    if(req.body.nombre || req.body.marco)
        res.status(401).send({message:'Error de validacion'});

    

    Curso.findOneAndUpdate({nombre}, {
        nombre:req.body.nombre,
        marco:req.body.marco
    }, {new: true})
    .then(curso => {
        if(!curso) {
            res.status(404).send({
                message: "No se encontro curso con " + nombre
            });
        }
        res.send(note);
    }).catch(err => {
        res.status(500).send({
            message: "Error de actualizacion con el curso " + nombre
        });
    });
};
exports.buscarTodo = async(req,res)=>
{
    Curso.find()
    .then(cursos => {
        res.status(200).send(cursos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error de Servidor"
        });
    });
};
exports.buscarCurso = async(req,res)=>
{
    const {nombre} = req.params;
    const curso = await Curso.findOne({nombre});
    if(!curso)
    {
       return res.status(400).send({message:'Curso no existe'});
    }else
       return  res.status(200).send(curso);
}
exports.eliminarCurso = async(req,res)=>
{
    const {nombre} = req.body;
    Curso.findOneAndDelete({nombre})
    .then(curso => {
        if(!curso) {
             res.status(404).send({
                message: "No se encontro curso con nombre " + nombre
            });
        }
        res.status(200).send({message: "Curso eliminado"});
    }).catch(err => {
         res.status(404).send({
            message: "No se encontro curso con nombre " + nombre
            });
    });

}
