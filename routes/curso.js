
const {Router} = require('express');

const router = Router();
const cursoController = require('../controllers/curso.controller');


router.get('/curso/obtenerCursos',cursoController.buscarTodo);
router.post('/curso',cursoController.crearCurso);
router.get('/curso/:nombre',cursoController.buscarCurso);
router.put('/curso/actualizar/:nombre',cursoController.actualizarCurso);
router.delete('/curso/eliminar/:nombre',cursoController.eliminarCurso);

module.exports = router;