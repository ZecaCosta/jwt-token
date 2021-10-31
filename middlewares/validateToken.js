// criação de um middleware para autenticação de token pra
// rota(s) atenticada(s).

// importar model pois será verificada a existência
// do usuário no BD
const usersModel = require('../models/usersModel');
// importar JWT, pois será vericado o token
const jwt = require('jsonwebtoken');

const secret = "abc"; // usado na descriptografia

// função propriamente dita (assíncrona)
// como é middleware usa next
const validateToken = async (req, res, next) => {
// primeira validação: recebeu token pelo header?
// authorization: nome padrão utilizado
    const token = req.headers.authorization;
    // opção: const token = req.headers['authorization'];
    if(!token)
        return res.status(401).json({ error: "Token não encontrado ou informado" });
// segunda validação: quando o usuário logou a primeira vez
// recebeu um token, e esse token doi armazendao no BD.
// validar se token recebido é do usuário
    try {
// descriptografar o token recebido do header
        const decoded = jwt.verify(token, secret);
// buscar o usuário do token no BD. Busca pelo payload
// do token de criação (data)
        const user = await usersModel.findUser(decoded.data);
        if(!user)
            return res.status(401).json({ message: "Erro ao procurar usuario do token." });

        req.user = user; // atribuir o usuário encontrado ao usuário da requisição

        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
        // error.message: pra receber erros do JWT
    }
};

module.exports = validateToken;
