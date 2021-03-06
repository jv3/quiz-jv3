// Construye la DB y el modelo importando quiz.js
var path = require('path');

// Postgres DATABASE_URL = postgres://user:password@host:port/DATABASE_URL
// SQLite   DATABASE_URL = squlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name =   (url[6]||null);
var user =      (url[2]||null);
var pwd =       (url[3]||null);
var protocol =  (url[1]||null);
var dialect =   (url[1]||null);
var port =      (url[5]||null);
var host =      (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres:
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect: protocol,
    protocol: protocol,
    port: port,
    host: host,
    storage: storage, // solo SQLite (.env)
    omitNull: true // solo Postgres
  }
);

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exportar definición de la tabla Quiz para poder acceder
// a los elementos de la tabla desde otras partes de la aplicación

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
        respuesta: 'Roma',
        tema: 'Humanidades'
      });
      Quiz.create({ // crea un segunda pregunta de la tabla
        pregunta: 'Capital de Portugal',
        respuesta: 'Lisboa',
        tema: 'Humanidades'
      }).then(function(){console.log('Base de datos inicializada')});
    };
  });
});
