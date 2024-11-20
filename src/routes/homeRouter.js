import express from 'express';
import Publicacoes from '../models/publicacoes.js';
import Usuarios from '../models/usuarios.js';


// define uma rota padrão
const router = express.Router();
router.get("/", async function (req, res) {

    console.log("INÍCIO");
    try {

        // testes aqui

    } catch (err) {
        console.log(err)
    }
    console.log("FIM");

    res.json("BOM DIAA!");
});


export default router;
