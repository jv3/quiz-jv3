// MODULO DE ENRUTAMIENTO //
var express = require('express');
var router = express.Router(); // clase para crear manejadores de rutas de forma modular

var quizController = require('../controllers/quiz_controller');

// Página de entrada. home page.
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con :quizId
// El acceso a cualquier url que contenga el parametro :quizId ejecutará primero
// el controlador load que hará una busqueda por dicho Id y despues saltará
// al siguiente middelware que case con la url
router.param('quizId', quizController.load);

// Definición de rutas de /quizes
router.get('/quizes', quizController.index); // muestra la colección de preguntas. Por convenio REST se llema a este controlador 'index'
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);

router.get('/author', quizController.author);

module.exports = router;
