import express from 'express';
import controller from '../controller/comentariosController.js';


// Rotas dos comentários
const router = express.Router();
router.get('/:publicacao_id', controller.listarComentarios);
router.post('/', controller.criarComentario);
router.delete('/', controller.deletarComentario);


export default router;
