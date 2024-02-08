
import express from 'express';
import { getAllTiendas } from '../controller/tiendasController';

const router = express.Router();

router.get('/tiendas',getAllTiendas);
// router.post('/tiendas/:sfid', validateGetTiendasBySfid, getTiendaBySfid);
//router.post('/procesadosImagenes/:idExpositor', validateGetProcesadosByIdExpositor, getProcesadosByIdExpositor);

export default router;