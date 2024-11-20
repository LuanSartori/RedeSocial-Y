import express from 'express';
import controller from '../controller/comentariosController.js';

// Rotas dos comentários
const router = express.Router();
router.get('/comentarios', controller.listarComentarios);
router.post('/comentarios', controller.criarComentario);
router.delete('/comentarios', controller.deletarComentario);


export default router;
