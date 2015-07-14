// El controlador importa el modelo para poder acceder a DB
// con los métodos models.Quiz.findAll() o find() buscamos los datos en la tabla.

// Quiz y los procesamos en el callback del método success(..).

// En el ejemplo usamos findAll() para buscar el array de elementos de la tabla
// Quiz y como solo tiene una pregunta en la tagla, cogemos el primer elementos
// quiz[0].

var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res) {
  models.Quiz.findAll({ include: [{ all: true }]} ).then(function(quiz) {
    res.render('quizes/question', {title: 'Quiz',
                                   pregunta: quiz[0].pregunta});
  });
};

// GET /quizes/answer
exports.answer = function(req, res) {
  models.Quiz.findAll({ include: [{ all: true }]} ).then(function(quiz) {
    if (req.query.respuesta === quiz[0].respuesta) {
      res.render('quizes/answer', { respuesta: 'Correcto' });
    } else {
      res.render('quizes/answer', { respuesta: 'Incorrecto' });
    }
  });
};

// GET /authors
exports.author = function(req, res) {
  res.render('author', {title: 'Autores',
                        author: 'Jesús Vallejo'});
};
