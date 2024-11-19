import express from 'express';
import Usuarios from '../models/usuarios.js';


// define uma rota padrão
const router = express.Router();
router.get("/", async function (req, res) {

    console.log("INÍCIO");
    try {

        const user = await Usuarios.findByPk("123")
        console.log(user)

    } catch (err) {
        console.log(err)
    }
    console.log("FIM");

    res.json("BOM DIAA!");
});


export default router;
