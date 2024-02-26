import express from 'express';
import { generarInformeAuditoria, getDatosInformeAuditoria } from '../controller/informeController';

const router = express.Router();

router.get('/datos_informe/:id_auditoria_cifrada', getDatosInformeAuditoria)

router.post('/descargar_informe', generarInformeAuditoria)
//router.post('/enviar_informe', enviarInforme);

export default router;
