import express from 'express';
import { listarUsuarios, criarUsuario } from '../controller/usuarioController.js';


const router = express.Router();
router.get('/', listarUsuarios);
router.post('/cadastro', criarUsuario);


export default router;