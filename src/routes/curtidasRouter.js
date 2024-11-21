import express from "express";
import controller from "../controller/curtidasController.js";

const router = express.Router();
router.post('/publicacao', controller.curtirPublicacao);
router.delete('/publicacao', controller.descurtirPublicacao);
router.post('/comentario', controller.curtirComentario);
router.delete('/comentario', controller.descurtirComentario);


export default router;
