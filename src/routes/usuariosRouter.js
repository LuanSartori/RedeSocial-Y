import express from 'express';
import controller from '../controller/usuariosController.js';


const router = express.Router();
router.get('/', controller.listarUsuarios);
router.post('/', controller.criarUsuario);
router.get('/:usuario_id', controller.detalhesDoUsuario);
router.patch('/:usuario_id', controller.atualizarUsuario);


export default router;
