import express, { Router } from 'express';
import { getAuditorias } from '../controller/auditoriaController';

const router: Router = express.Router();

router.use('/auditorias/:id_tienda',  getAuditorias);

// router.post('/nueva_auditoria',  createAuditoria);

export default router;