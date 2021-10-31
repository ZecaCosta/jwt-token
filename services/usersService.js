const usersModel = require('../models/usersModel');

const createUser = async (username, password) => {
const newUser = await usersModel.createUser(username, password);
  return newUser;
};

const createLogin = async (username) => {
const user = await usersModel.findUser(username);
  return user;
};

module.exports = {
  createUser,
  createLogin
}