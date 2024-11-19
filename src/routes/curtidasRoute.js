import express from "express";
import { curtirComent,curtirPubli,removeCurtidaC,removeCurtidaP } from "../controller/curtidasController";

const router = express.Router();
router.post('/curtidas/publicacao', curtirPubli);
router.delete('/curtidas/publicacao', removeCurtidaP);
router.post('/curtidas/comentario', curtirComent);
router.delete('/curtidas/comentario', removeCurtidaC);

export default router;