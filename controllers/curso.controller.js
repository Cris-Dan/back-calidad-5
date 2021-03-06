const Curso = require('../models/Curso');

exports.crearCurso = async (req, res) => {
    const { nombre } = req.body;

    const curso = await Curso.findOne({ nombre });
    if (curso) {
        res.status(400).send({ Error: 'Curso Existente' });
    } else {
        const newCurso = new Curso({});
        newCurso.nombre = req.body.nombre;
        newCurso.marco = req.body.marco;
        if (req.body.url_imagen != null) newCurso.url_imagen = req.body.url_imagen;
        if (req.body.descripcion != null) newCurso.descripcion = req.body.descripcion;

        await newCurso.save();
        res.status(200).send({ Mensaje: 'Creado' });
    }
};
exports.actualizarCurso = async (req, res) => {

    const { nombre } = req.params;

    if (!req.body.marco)
        return res.status(401).send({ message: 'Error de validacion' });

    const curso = {};
    if(req.body.marco!=null)curso.marco = req.body.marco;
    if (req.body.nombre!=null) curso.nombre=req.body.nombre;
    if (req.body.url_imagen != null) curso.url_imagen = req.body.url_imagen;
    if (req.body.descripcion != null) curso.descripcion = req.body.descripcion;
    //if(req.body.veces_solicitado != null) curso.veces_solicitado=req.body.veces_solicitado;

    Curso.findOneAndUpdate({ nombre }, curso, { new: true })
        .then(curso => {
            if (!curso) {
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
exports.buscarTodo = async (req, res) => {
    Curso.find()
        .then(cursos => {
            return res.status(200).send(cursos);
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Error de Servidor"
            });
        });
};
exports.buscarCurso = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findOne({ _id: id });
    if (!curso) {
        return res.status(400).send({ message: 'Curso no existe' });
    } else
        return res.status(200).send(curso);
}

exports.eliminarCurso = async (req, res) => {
    const { nombre } = req.params;
    Curso.findOneAndDelete({ nombre })
        .then(curso => {
            if (!curso) {
                return res.status(404).send({
                    message: "No se encontro curso con nombre " + nombre
                });
            }
            return res.status(200).send({ message: "Curso eliminado" });
        }).catch(err => {
            return res.status(404).send({
                message: "No se encontro curso con nombre " + nombre
            });
        });

}
