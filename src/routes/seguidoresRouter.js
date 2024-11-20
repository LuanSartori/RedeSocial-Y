import express from 'express';
import { seguirUsuario, deixarDeSeguirUsuario, listagemDeSeguidores, listagemDeUsuarios } from "../controller/seguidoresController";

const router = express.Router();
router.post('/seguidores', seguirUsuario);
router.delete('/seguidores', deixarDeSeguirUsuario);
router.get('/seguidores/:usuario_id', listagemDeSeguidores);
router.get('/seguidores/seguindo/:usuario_id', listagemDeUsuarios);

export default router;