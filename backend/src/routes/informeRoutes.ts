import express from 'express';
import { descargarInformeAuditoria } from '../controller/informeController';

const router = express.Router();

router.post('/descargar_informe', descargarInformeAuditoria)

export default router;
