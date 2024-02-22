import express from 'express';
import { generarInformeAuditoria } from '../controller/informeController';
import { enviarInforme } from '../controller/emailController';

const router = express.Router();

router.post('/descargar_informe', generarInformeAuditoria)
router.post('/enviar_informe', enviarInforme);

export default router;
