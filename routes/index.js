// MODULO DE ENRUTAMIENTO //
var express = require('express');
var router = express.Router(); // clase para crear manejadores de rutas de forma modular

var quizController = require('../controllers/quiz_controller');

// Página de entrada. home page.
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);

// Definición de rutas de /quizes
// Busqueda de preguntas
//router.get('/quizes(/(\?search=([a-zñáéíóú]+))?/ig)', quizController.index);

router.get('/quizes', quizController.index); // muestra la colección de preguntas. Por convenio REST se llema a este controlador 'index'
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/author', quizController.author);

module.exports = router;
