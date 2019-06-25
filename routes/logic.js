const express = require('express');
const router = express.Router();

const logiccontroller = require('../controllers/logic.controller');

router.get("/v1/ordenadoProfesorEdad",logiccontroller.profesor_ordenado_por_edad);
router.get("/v1/ordenadoProfesorFemenino",logiccontroller.profesor_ordenado_por_sexo_femenino);
router.get("/v1/ordenadoProfesorMasculino",logiccontroller.profesor_ordenado_por_sexo_masculino);
router.get("/v1/ordenadoAlumnoEdad",logiccontroller.alumno_ordenado_por_edad);
router.get("/v1/ordenadoAlumnoFemenino",logiccontroller.alumno_ordenado_por_sexo_femenino);
router.get("/v1/ordenadoAlumnoMasculino",logiccontroller.alumno_ordenado_por_sexo_masculino);
router.get("/v1/profesoresCercania",logiccontroller.profesor_ordenado_por_cercania);
router.get("/v1/cursoPorMarco/:marco",logiccontroller.curso_por_marco);
router.get("/v1/cursoFrecuente",logiccontroller.ordenar_curso_por_mas_frecuencia);
router.get("/v1/profesorMasDictados",logiccontroller.ordenar_profesor_por_mas_dictado);

module.exports=router;