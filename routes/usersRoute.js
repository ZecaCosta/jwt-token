const express = require("express"); // sempre presente
const usersController = require('../controllers/usersController');

// como se trata de rotas é preferível usar router ao invés de app
const router = express.Router();

// rota pra cadastrar usuário no BD
router.post('/users', usersController.createUser);

// rota para usuário realizar login 
router.post('/users/login', usersController.createLogin);

module.exports = router;
