import express from 'express';
import { getAllTiendas, newTienda, updateTienda, activarDesactivarBooleanoTienda, guardarPosicionMueble, desactivarPosicionMueble } from '../controller/tiendasController';

const router = express.Router();

router.get('/tiendas',getAllTiendas);

router.post('/tiendas', newTienda);
router.post('/tiendas/:id_tienda', updateTienda);
router.post('/posicion_mueble', guardarPosicionMueble);


router.put('/tiendas/', activarDesactivarBooleanoTienda);
router.put('/desactivar_mueble_tienda/', desactivarPosicionMueble);


export default router;