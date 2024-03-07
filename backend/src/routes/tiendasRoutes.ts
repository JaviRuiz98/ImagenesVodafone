import express from 'express';
import { getAllTiendas, newTienda, updateTienda, activarDesactivarTienda, guardarPosicionMueble } from '../controller/tiendasController';

const router = express.Router();

router.get('/tiendas',getAllTiendas);

router.post('/tiendas', newTienda);
router.post('/tiendas/:id_tienda', updateTienda);
router.post('/posicion_mueble/:id_pertenencia_mueble_tienda', guardarPosicionMueble);


router.put('/tiendas/', activarDesactivarTienda);


export default router;