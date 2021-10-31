const express = require("express");
const multer = require("multer"); // upload routes: pacote
// importar middleware de autenticação de token, pois a rota
// de upload de arquivos será uma rota autenticada
const validateToken = require('../middlewares/validateToken');

const router = express.Router();
// upload routes: pra quando for necessário acessar os arquivos
router.use(express.static(__dirname + "uploads/")); 

// upload routes: pra definir local e nome dos arquivos armazenados
const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (_req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage }); // upload routes

// quando usar + de 1 middleware usar array [], na ordem de execução
// upload.array: pois será mais de 1 arquivo (Max)
// file: será um array tipo form-data de até 3 posições
router.post("/photos", [validateToken, upload.array("file", 3)], (req, res) => {
    try {
        res.status(200).json({ message: "Imagens enviadas com sucesso!" });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao enviar as imagens",
            error: error.message
        });
    }
});

module.exports = router; // exportanto o router completo
