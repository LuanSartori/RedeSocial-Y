import express from 'express';
import Publicacoes from '../models/publicacoes.js';
import Usuarios from '../models/usuarios.js';
import Seguidores from '../models/seguidores.js';


// define uma rota padrão
const router = express.Router();
router.get("/", async function (req, res) {

    console.log("INÍCIO");
    try {

        // const user_1 = await Usuarios.findByPk('9cc860a1-fca3-41a1-880a-91023e695c50');
        // const user_2 = await Usuarios.findByPk('f85fe42b-7f7d-4e97-b5b4-940223beda4c');

        // const x = await user_1.addSeguidor(user_2);
        // console.log(x)
        // res.json(x);
        // return;

        // const segs = await Seguidores.findByPk("9cc860a1-fca3-41a1-880a-91023e695c50");
        // console.log(segs);
        // res.json(segs);
        // segs.destroy();
        // return;

    } catch (err) {
        console.log(err)
    }
    console.log("FIM");

    res.json("BOM DIAA!");
});


export default router;
