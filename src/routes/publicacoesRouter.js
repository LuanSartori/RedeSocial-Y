import express from 'express';
import controller from '../controller/publicacoesController.js';


const router = express.Router();
router.get('/', controller.listarPublicacoes);
router.post('/criar', controller.criarPublicacao);
router.get('/de/:usuario_id', controller.listarPublicacoesDeUmUsuario);
router.get('/:publicacao_id', controller.obterPublicacao);
router.delete('/', controller.deletarPublicacao);


export default router;
