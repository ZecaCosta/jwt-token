// conn.js é sempre um boilerplate sendo variável apenas 
// a porta e o nome do banco de dados.

const mongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017'; // ou coloque sua URL do MongoDB aqui

connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('revisao28'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
