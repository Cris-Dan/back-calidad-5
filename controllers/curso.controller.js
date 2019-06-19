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
        if(req.body.url_imagen != null) newCurso.url_imagen=req.body.url_imagen;
        if(req.body.descripcion != null) newCurso.descripcion=req.body.descripcion;

        await newCurso.save();
        res.status(200).send({Mensaje:'Creado'});
    }
};
exports.actualizarCurso = async(req,res)=>
{

    const {nombre} = req.params;

    if(!req.body.nombre || !req.body.marco)
        return res.status(401).send({message:'Error de validacion'});

    var descripcion;
    var url_imagen;
    if(req.body.url_imagen != null) url_imagen=req.body.url_imagen;
    if(req.body.descripcion != null) descripcion=req.body.descripcion;

    Curso.findOneAndUpdate({nombre}, {
        nombre:req.body.nombre,
        marco:req.body.marco,
        descripcion: descripcion,
        url_imagen: url_imagen
    }, {new: true})
    .then(curso => {
        if(!curso) {
         return res.status(404).send({
                message: "No se encontro curso con " + nombre
            });
        }
        return res.send(curso);
    }).catch(err => {
        return res.status(500).send({
            message: "Error de actualizacion con el curso " + nombre
        });
    });
};
exports.buscarTodo = async(req,res)=>
{
    Curso.find()
    .then(cursos => {
        return res.status(200).send(cursos);
    }).catch(err => {
        return res.status(500).send({
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
    const {nombre} = req.params;
    Curso.findOneAndDelete({nombre})
    .then(curso => {
        if(!curso) {
             return res.status(404).send({
                message: "No se encontro curso con nombre " + nombre
            });
        }
        return res.status(200).send({message: "Curso eliminado"});
    }).catch(err => {
         return res.status(404).send({
            message: "No se encontro curso con nombre " + nombre
            });
    });

}
