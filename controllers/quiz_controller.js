// El controlador importa el modelo para poder acceder a DB
// con los métodos models.Quiz.findAll() o find() buscamos los datos en la tabla
// Quiz y los procesamos en el callback del método then(..).

var models = require('../models/models.js');

// Para no acceder dos veces a la base de datos: la primera vez cuando accedemos
// al recurso que muestra la pregunta y la segunda vez cuando se accede al recurso
// que muestra la respuesta para la pregunta mostrada es correcta, creamos un método
// load que carga la pregunta y respuesta con un determinado ID

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;  //aqu se guarda el resultado de la consulta, que despues
        // se usará en 'show' y en 'answer'
        next(); // saltamos al siguiente middelware
      } else {
        next(new Error('No existe quizId=' + quizId));
      }
    }).catch(function(error) { next(error); });
};

// GET /quizes
exports.index = function(req, res, next) {
  var search = '%';

  if (req.query.search) {
    search = '%' + req.query.search + '%';
    console.log (search)
    search = search.replace(/ /g, '%'); // busca todos los espacios y los reemplaza
  }

  models.Quiz.findAll({ where:["pregunta like ?", search],
                        order:[["pregunta", "ASC"]]
                      }).then(function(quizes) {
                              res.render('quizes/index', { quizes: quizes });
    }
  ).catch(function(error) { next(error); });
};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz });
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
      resultado = 'Correcto';
  }
  res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado });
};

// GET /authors
exports.author = function(req, res) {
  res.render('author', {title: 'Autores',
                        author: 'Jesús Vallejo'});
};
