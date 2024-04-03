import express, { Router } from 'express';

import { getAuditorias, 
    createSingleAuditoria, 
    getAuditoriaById, 
    terminarAuditoria, 
    createAuditoriaGlobal, 
    getBarraProgresoAuditoria, 
    getEstadisticasEstadosAuditoria,
    getMovimientosAuditorias
} from '../controller/auditoriaController';

import {
    getElementosProcesadosAuditoria,
    getEstadisticasResultadosAuditoria,
    getPorcentajeProcesadoDadoEstadoAuditoria,
} from '../controller/elementosAuditoriaController';

const router: Router = express.Router();

router.get('/auditorias/:id_tienda',  getAuditorias);
router.get('/auditoria_by_id/:id_auditoria',  getAuditoriaById);
router.get('/barra_progreso_auditoria/:id_auditoria', getBarraProgresoAuditoria );
router.get('/auditoria_elementos_procesados/:id_auditoria', getElementosProcesadosAuditoria);

router.post('/estadisticas/movimientos_auditorias', getMovimientosAuditorias);
router.post('/estadisticas/estados_auditoria', getEstadisticasEstadosAuditoria);
router.get('/estadisticas/resultados_auditoria', getEstadisticasResultadosAuditoria);
router.get('/estadisticas/porcentaje_completado', getPorcentajeProcesadoDadoEstadoAuditoria);

router.post('/nueva_auditoria',  createSingleAuditoria);
router.post('/auditoria_global',  createAuditoriaGlobal);

router.put('/terminar_auditoria',  terminarAuditoria);
router.put('/enviar_informe',  terminarAuditoria);

export default router;