// Construye la DB y el modelo importando quiz.js
var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite",
                                                storage: "quiz.sqlite" // fichero donde se van a guardar los datos
                                              });

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exportar definición de la tabla Quiz

// sequelize.sync() crea e inicializa tabla de preguntas en DB
// ejecuta el callback del método success cuando se ha sincronizado.
sequelize.sync({force: true}).then(function() {
  // success(..) ejecuta el manejador una vez creada la tabla
  // en el callback de sequelize.sync().success(..) introducimos en la DB
  // la misma pregunta de las version anteriores, para que todo funcione igual
  Quiz.count().then(function (count){// devuelve en count el numero de filas de la tabla
    if(count === 0 ) { // la tabla se inicializa solo si está vacía
      Quiz.create({ // crea la primera pregunta de la tabla
        // los campos de la tabla tienen que tener el mismo nombre que las propiedades.
        pregunta: 'Capital de Italia',
        respuesta: 'Roma'
      }).then(function(){console.log('Base de datos inicializada')});
    };
  });
});
