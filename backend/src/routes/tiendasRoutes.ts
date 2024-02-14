
import express from 'express';
import { getAllTiendas, newTienda, updateTienda, activarDesactivarTienda} from '../controller/tiendasController';
//import { validateGetTiendasBySfid } from '../validator/tiendaValidator';


const router = express.Router();

router.get('/tiendas',getAllTiendas);
router.post('/tiendas', newTienda);
router.post('/tiendas/:id_tienda', updateTienda);
router.put('/tiendas/', activarDesactivarTienda);



//router.post('/tiendas/:sfid', validateGetTiendasBySfid, getTiendaBySfid);
//router.post('/procesadosImagenes/:idExpositor', validateGetProcesadosByIdExpositor, getProcesadosByIdExpositor);

export default router;