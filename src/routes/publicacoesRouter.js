import express from 'express';
import controller from '../controller/publicacoesController.js';


const router = express.Router();
router.get('/', controller.listarPublicacoes);
router.post('/criar', controller.criarPublicacao);


export default router;
