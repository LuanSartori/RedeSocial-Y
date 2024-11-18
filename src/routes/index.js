import express from 'express';
import usuarioRouter from "./usuarioRoute.js";


// define uma rota padrão
const router = express.Router();
router.get("/", function (req, res) {
    res.json("BOM DIAA!");
});


// função que indexa todas as pastas de rotas
export default function(app) {
    app.use("/", router);
    app.use("/usuarios", usuarioRouter);
}
