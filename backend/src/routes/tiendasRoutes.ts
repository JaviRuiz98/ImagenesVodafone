import express from 'express';
import { getAllTiendas, newTienda, updateTienda, activarDesactivarBooleanoTienda, guardarPosicionMueble, desactivarPosicionMueble } from '../controller/tiendasController';
import { uploadPlanoImagen } from '../config/multer';
import { uploadFileToFtp } from '../config/ftpUpload';

const router = express.Router();

router.get('/tiendas',getAllTiendas);

router.post('/tiendas', uploadPlanoImagen, uploadFileToFtp('imagenesPlano', true), newTienda);
router.put('/tiendas/:id_tienda',  updateTienda);
router.post('/posicion_mueble',  uploadPlanoImagen, uploadFileToFtp('imagenesPlano', true), guardarPosicionMueble);


router.put('/tiendas/', activarDesactivarBooleanoTienda);
router.put('/desactivar_mueble_tienda/', desactivarPosicionMueble);


export default router;