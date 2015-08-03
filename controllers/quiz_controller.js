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
    //models.Quiz.findById(quizId).then(
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
    search = '%' + req.query.search.replace(/ /g, '%') + '%';
    // busca todos los espacios y los reemplaza
  }

  models.Quiz.findAll({ where:["pregunta like ?", search],
                        order:[["pregunta", "ASC"]]
                      }).then(function(quizes) {
                              res.render('quizes/index', { quizes: quizes, errors: [] });
    }
  ).catch(function(error) { next(error); });
};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz, errors: [] });
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
      resultado = 'Correcto';
  }
  res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado, errors: [] });
};


// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build( // crea un objeto quiz
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  res.render('quizes/new', {quiz: quiz, errors: [] });
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build(req.body.quiz);

  // guarda en DB los campos pregunta y respuesta de quiz realizando antes las validaciones
  quiz
    .validate()
    .then(
      function(err) {
        if (err) {
          res.render('quizes/new', {quiz: quiz, errors: err.errors});
        } else {
          quiz // save: guarda en BD los campos pregunta y respuesta de quiz
          .save({fields: ["pregunta", "respuesta"]})
          .then(function(){ res.redirect('/quizes'); }); // Redirección HTTP (URL relativo) lista de preguntas
        }
      }
    );
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
  var quiz = req.quiz; // autoload de instancia de quiz

  res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function (req, res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;

  req.quiz
  .validate()
  .then(
    function(err) {
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
        req.quiz  // save: guarda los campos pregunta y respuesta en la BD
        .save( {fields: ["pregunta", "respuesta"]}) // indicamos especificamente los campos a guardar, así evitamos la inyección de codigo malicioso
        .then ( function(){ res.redirect('/quizes'); }); // redirección HTTP a la lista de preguntas
      }
    }
  )
}

exports.destroy = function(req, res) {
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};

// GET /authors
exports.author = function(req, res) {
  res.render('author', {title: 'Autores',
                        author: 'Jesús Vallejo',
                        errors: []
                      });
};
