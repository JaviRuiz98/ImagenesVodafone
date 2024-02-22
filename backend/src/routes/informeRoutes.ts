import express from 'express';
import { generarInformeAuditoria } from '../controller/informeController';

const router = express.Router();

router.post('/generar_informe', generarInformeAuditoria)

export default router;
