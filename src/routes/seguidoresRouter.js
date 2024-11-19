import express from 'express';
import controller from '../controller/seguidoresController.js';


const router = express.Router();
router.get('/', controller.listarSeguidores);

export default router;