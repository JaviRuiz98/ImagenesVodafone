import express from 'express';
import { enviarInforme } from '../controller/informeController';

const router = express.Router();

router.post('/enviar_informe', enviarInforme);

export default router;
