import express from 'express';
import { getAllTiendas, newTienda, updateTienda, activarDesactivarTienda} from '../controller/tiendasController';
import { informe } from '../controller/informeController';

const router = express.Router();

router.get('/tiendas',getAllTiendas);
router.post('/tiendas', newTienda);
router.post('/tiendas/:id_tienda', updateTienda);
router.put('/tiendas/', activarDesactivarTienda);
router.get('/tiendas/informe', informe);

export default router;