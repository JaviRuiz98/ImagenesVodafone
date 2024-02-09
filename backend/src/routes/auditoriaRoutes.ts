import express, { Router } from 'express';
import { getAuditorias, createAuditoria, getAuditoriaById } from '../controller/auditoriaController';

const router: Router = express.Router();

router.get('/auditorias/:id_tienda',  getAuditorias);
router.get('/auditorias_by_id',  getAuditoriaById);

// router.post('/nueva_auditoria',  createAuditoria);

export default router;