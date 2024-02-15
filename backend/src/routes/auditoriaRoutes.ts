import express, { Router } from 'express';
import { getAuditorias, createAuditoria, getAuditoriaById, terminarAuditoria, createAuditoriaGlobal, getBarraProgresoAuditoria } from '../controller/auditoriaController';

const router: Router = express.Router();

router.get('/auditorias/:id_tienda',  getAuditorias);
router.get('/auditoria_by_id/:id_auditoria',  getAuditoriaById);
router.get('/barra_progreso_auditoria/:id_auditoria', getBarraProgresoAuditoria );

router.post('/nueva_auditoria',  createAuditoria);
router.post('/auditoria_global',  createAuditoriaGlobal);

router.put('/terminar_auditoria',  terminarAuditoria);

export default router;