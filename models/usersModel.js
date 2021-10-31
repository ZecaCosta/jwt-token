const connect = require('./conn'); // models têm conexão com BD

// como o BD retorna promise os métodos/funções devem ser assíncronos (async)

// método pra salvar 1x usuário no BD na collection users
const createUser = async (username, password) => 
  connect().then((db) =>
    db.collection('users').insertOne({ username, password })
  ).then(result => { //segundo then, pois quero retornar apenas usuário
    console.log(result.ops)
    return result.ops[0].username //retornar apenas usuário
  });
  // ops: array that contains the document(s) inserted with added _id fields
  // no caso de um insertOne: array com 1 objeto, conforme abaixo:
  /*
  [
    {
    username: 'user',
    password: 'passaword',
    _id: id
    }
  ]
  */

  // método pra encontrar 1x usuário no BD na collection users
const findUser = async (username) =>
  connect().then((db) => db.collection('users').findOne({ username }));
// essa função retornará um objeto conforme abaixo:
/*
{
  _id: id
  username: 'user',
  password: 'passaword',
  }
*/

module.exports = {
  createUser,
  findUser
};
