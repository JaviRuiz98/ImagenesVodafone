
import express from 'express';
import { getAllTiendas, getProcesadosByIdExpositor, getTiendaBySfid } from '../controller/tiendasController';
import { validateGetProcesadosByIdExpositor, validateGetTiendasBySfid } from '../validator/tiendaValidator';

const router = express.Router();

router.get('/tiendas',getAllTiendas);
router.get('/tiendas/:sfid', validateGetTiendasBySfid, getTiendaBySfid);
router.post('/procesadosImagenes/:idExpositor', validateGetProcesadosByIdExpositor, getProcesadosByIdExpositor);

export default router;