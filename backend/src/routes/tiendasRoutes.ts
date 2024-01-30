
import express from 'express';
import { getAllTiendas, getTiendaBySfid } from '../controller/tiendasController';
import { validateGetTiendasBySfid } from '../validator/tiendaValidator';

const router = express.Router();

router.get('/tiendas',getAllTiendas);
router.post('/tiendas/:sfid', validateGetTiendasBySfid, getTiendaBySfid);

export default router;