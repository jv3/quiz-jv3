// El controlador importa el modelo para poder acceder a DB
// con los métodos models.Quiz.findAll() o find() buscamos los datos en la tabla.

// Quiz y los procesamos en el callback del método success(..).

// En el ejemplo usamos findAll() para buscar el array de elementos de la tabla
// Quiz y como solo tiene una pregunta en la tagla, cogemos el primer elementos
// quiz[0].

var models = require('../models/models.js');

// GET /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
    res.render('quizes/index.ejs', { quizes:quizes });
  });
};

// GET /quizes/:id
exports.show = function(req, res) {
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', {title: 'Quiz',
                                   quiz: quiz});
  });
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
    if (req.query.respuesta === quiz.respuesta) {
      res.render('quizes/answer', { quiz: quiz, respuesta: 'Correcto' });
    } else {
      res.render('quizes/answer', { quiz: quiz, respuesta: 'Incorrecto' });
    }
  });
};

// GET /authors
exports.author = function(req, res) {
  res.render('author', {title: 'Autores',
                        author: 'Jesús Vallejo'});
};
