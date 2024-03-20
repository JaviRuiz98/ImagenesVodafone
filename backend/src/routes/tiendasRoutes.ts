import express from 'express';
import { getAllTiendas, newTienda, updateTienda, activarDesactivarBooleanoTienda, guardarPosicionMueble, desactivarPosicionMueble } from '../controller/tiendasController';
import { uploadPlanoImagen } from '../config/multer';
import { uploadFileToFtp } from '../config/ftpUpload';

const router = express.Router();

router.get('/tiendas',getAllTiendas);

router.post('/tiendas',  uploadPlanoImagen, uploadFileToFtp('imagenesPlano', true), newTienda);
router.post('/posicion_mueble', guardarPosicionMueble);

router.put('/tiendas/:id_tienda', uploadPlanoImagen, uploadFileToFtp('imagenesPlano', true),  updateTienda);
router.put('/tiendas/', activarDesactivarBooleanoTienda);
router.put('/desactivar_mueble_tienda/', desactivarPosicionMueble);


export default router;