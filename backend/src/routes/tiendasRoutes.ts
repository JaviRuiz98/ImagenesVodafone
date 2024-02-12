
import express from 'express';
import { getAllTiendas, newTienda, getTiendaBySfid, asignarPertenenciaMuebleTienda } from '../controller/tiendasController';
import { validateGetTiendasBySfid } from '../validator/tiendaValidator';


const router = express.Router();

router.get('/tiendas',getAllTiendas);
router.post('/tiendas', newTienda);
router.post('/tiendas/:id_tienda', asignarPertenenciaMuebleTienda);



router.post('/tiendas/:sfid', validateGetTiendasBySfid, getTiendaBySfid);
//router.post('/procesadosImagenes/:idExpositor', validateGetProcesadosByIdExpositor, getProcesadosByIdExpositor);

export default router;