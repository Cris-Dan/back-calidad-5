const Profesor = require('../models/Profesor');
const Alumno = require('../models/Alumno');
const Curso = require('../models/Curso');

exports.cantidadAlumnos = async (req, res) => {
    Alumno.countDocuments({}).exec().then((cantidad) => {
        res.status(200).send({cantidad});
    }).catch((err) => {
        res.status(400).send('error en obtener la cantidad de alumnos');
    })
}

exports.cantidadProfesores = async (req, res) => {
    Profesor.countDocuments({}).exec().then((cantidad) => {
        res.status(200).send({cantidad});
    }).catch((err) => {
        res.status(400).send('error en obtener la cantidad de profesores');
    })
}
exports.cantidadCursos = async (req, res) => {
    Curso.countDocuments({}).exec().then((cantidad) => {
        res.status(200).send({cantidad});
    }).catch((err) => {
        res.status(400).send('error en obtener la cantidad de cursos');
    })
}
exports.cantidadProfesoresM = async (req, res) => {
    Profesor.countDocuments({genero: 'Masculino'}).exec().then((cantidad) => {
        res.status(200).send({cantidad});
    }).catch((err) => {
        res.status(400).send('error en obtener la cantidad de profesores varones');
    })
}
exports.cantidadProfesoresF = async (req, res) => {
    Profesor.countDocuments({genero: 'Femenino'}).exec().then((cantidad) => {
        res.status(200).send({cantidad});
    }).catch((err) => {
        res.status(400).send('error en obtener la cantidad de profesoras');
    })
}

exports.cantidad = async (req, res) => {
    const cProfesorM = await Profesor.countDocuments({genero: 'Masculino'}).exec()
    const cProfesorF = await Profesor.countDocuments({genero: 'Femenino'}).exec()
    const cAlumnos = await Alumno.countDocuments({}).exec();
    const cProfesores = await Profesor.countDocuments({}).exec();
    const cCursos = await Curso.countDocuments({}).exec();
    const promEdadAlumnos = await Alumno.aggregate([
        {$group: {_id: null, promEdad: {$avg: "$edad"}}}
    ]);
    const promEdadProfesores = await Profesor.aggregate([
        {$group: {_id: null, promEdad: {$avg: "$edad"}}}
    ]);
    // los 3 cursos mas solicitados
    const cursosMasSolicitados = await Curso.aggregate([
        { $sort: {veces_solicitado : -1}},
        { $limit: 3}
    ])

    const estadisticas = {
        numAlumnos: cAlumnos,
        numProfesores: cProfesores,
        numCursos: cCursos,
        promEdadAlumnos: promEdadAlumnos[0].promEdad,
        promEdadProfesores: promEdadProfesores[0].promEdad,
        numProfeVarones: cProfesorM,
        numProfeMujeres: cProfesorF,
        cursosMasSolicitados
    }
    console.log(estadisticas);
    res.send(estadisticas);
}


