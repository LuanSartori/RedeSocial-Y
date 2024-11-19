import express from 'express';
import controller from '../controller/usuariosController.js';


const router = express.Router();
router.get('/', controller.listarUsuarios);
router.post('/cadastro', controller.criarUsuario);


export default router;
