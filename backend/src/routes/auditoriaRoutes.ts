import express, { Router } from 'express';
import { getAuditorias, createAuditoria, getAuditoriaById, terminarAuditoria } from '../controller/auditoriaController';

const router: Router = express.Router();

router.get('/auditorias/:id_tienda',  getAuditorias);
router.get('/auditoria_by_id/:id_auditoria',  getAuditoriaById);

router.post('/nueva_auditoria',  createAuditoria);

router.put('/terminar_auditoria',  terminarAuditoria);

export default router;