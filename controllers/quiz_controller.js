// GET /quizes/question
exports.question = function(req, res) {
  res.render('quizes/question', {title: 'Quiz',
                                 subtitle: 'Quiz: el juego de las preguntas',
                                 pregunta: 'Capital de Italia'});
};

// GET /quizes/answer
exports.answer = function(req, res) {
  if (req.query.respuesta === 'Roma') {
    res.render('quizes/answer', {title: 'Quiz',
                                   subtitle: 'Quiz: el juego de las preguntas',
                                   respuesta: 'Correcto'});
  } else {
    res.render('quizes/answer', {title: 'Quiz',
                                   subtitle: 'Quiz: el juego de las preguntas',
                                   respuesta: 'Incorrecto'});
  }
};
