const jwt = require('jsonwebtoken'); // pra geração de token JWT
const bcrypt = require('bcrypt-nodejs'); // pra criptografia da senha
const usersService = require('../services/usersService');

// como se trata de rota é preferível usar router
// ao invés de app
const secret = "abc"; // constante usada pelo JWT na geração do token
// rota para criação de usuário com async/await, pois BD retorna Promise
const createUser = async (req, res) => {
    try {
        const { username } = req.body;
        // deve ser uma variável, pois a senha recebida vai ser criptografada
        let password = req.body.password;
        // constante salt gerada pelo método genSaltSync. No caso, a senha será
        // cripitografa 5x. O método genSaltSync é a opção assíncrona  
        const salt = bcrypt.genSaltSync(5);
        // aplicar à varíavel password o método hashSync (opção assíncrona) 
        password = bcrypt.hashSync(password, salt);
        console.log(password);
        const newUser = await usersService.createUser(username, password);
        if(!newUser)
            throw Error;

        console.log(newUser);
        res.status(201).json({ message: "Novo Usuário", user: newUser });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao salvar o usuário no banco",
            error: error.message
        });
    }
};

// rota para usuário realizar login, também async/await 
const createLogin = async (req, res)=> {
    try {
        const { username, password } = req.body;
// testes de validação
        // recebeu usuário e senha do front-end?
        if(!username || !password)
            return res.status(401).json({ message: "É necessário usuário e senha para fazer login" });
        // usuário existe no banco de dados?
        // se usuário não existe o retorno será null
        // se usuário existe recebe objeto abaixo:
        /*
            {
            _id: id
            username: 'user',
            password: 'passaword',
            }
        */
        const user = await usersService.createLogin(username);
        console.log('teste existencia do usuário', user)
        if(!user)
            return res.status(401).json({ message: "Usuário não existe" });
// método compareSync (assíncrono) pra comparar senha recebida com senha do BD
// user.password, pois a constante user recebe objeto completo
        const isMatch = bcrypt.compareSync(password, user.password);
        console.log('resultado da comparação compareSync', isMatch)
        if(!isMatch) // true ou false
            return res.status(401).json({ message: "Senha inválida" });
// constante pra definir a configuração da criptografia do token
// período de expiração em segundos. Opções:
// expiresIn : '1y' | expiresIn : '24h'
// expiresIn : '5m' | expiresIn : '60s'
// algorítimo utilizado, no caso de 256 bits
        const jwtConfig = {
            // expiresIn: 60*5,
            expiresIn: '60s',
            algorithm: "HS256"
        }
// criar token proporiamente dito
// usar método sign com 3 parâmetros:
// payload: data (nome do usuário) , secret e configuraçoes 
        const token = jwt.sign({ data: user.username }, secret, jwtConfig);
// retornar token para o usuário (token:token)
        res.status(200).json({ message: "Login com sucesso", token });
    } catch (error) {
        res.status(500).json({
			message: "Erro interno",
			error: e.message
		});
    }
};

module.exports = {
  createUser,
  createLogin
}

// observações:

// 1-) API's REST são 'stateless', ou seja, não guardam o token
// enviado ao FRONT-END

// 2-) É responsabilidade do FRONT-END armazenar o token
// pra usar quando acessar rotas autenticadas.

// 3-) Como armazenar token no FRONT-END:
    // 3.1) localStorage
    // 3.2) cookies
    // 3.3 state
