const express = require('express');
const router = express.Router();

const estadisticaController = require('../controllers/estadistica.controller');

router.get("/estadistica/cantidad",estadisticaController.cantidad);
router.get("/estadistica/cantidadProfesores",estadisticaController.cantidadProfesores);
router.get("/estadistica/cantidadAlumnos",estadisticaController.cantidadAlumnos);
router.get("/estadistica/cantidadCursos",estadisticaController.cantidadCursos);
router.get("/estadistica/cantidadProfesoresM",estadisticaController.cantidadProfesoresM);
router.get("/estadistica/cantidadProfesoresF",estadisticaController.cantidadProfesoresF);


module.exports=router;