import express from 'express';
import controller from "../controller/seguidoresController.js";


const router = express.Router();
router.post('/', controller.seguirUsuario);
router.delete('/', controller.deixarDeSeguirUsuario);
router.get('/:usuario_id', controller.listagemDeSeguidores);
router.get('/seguindo/:usuario_id', controller.listagemDeUsuarios);


export default router;
