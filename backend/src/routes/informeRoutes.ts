import express from 'express';
import { generarInformeAuditoria, getDatosInformeAuditoria, enviarInforme, getUrlDadoIdAuditoria } from '../controller/informeController';

const router = express.Router();

router.get('/datos_informe/:id_auditoria_cifrada', getDatosInformeAuditoria)
router.get('/url_template/:id_auditoria', getUrlDadoIdAuditoria)

router.post('/descargar_informe', generarInformeAuditoria)
router.post('/enviar_informe', enviarInforme);

export default router;
