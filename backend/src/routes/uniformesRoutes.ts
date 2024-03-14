import express, { Router } from 'express';
import { getProductos, getCaracteristicas, postNuevoProducto, postCaracteristicaProducto } from '../controller/uniformesController';
import {  uploadImagenProducto } from '../config/multer';
import { uploadFileToFtp } from '../config/ftpUpload'; 
const router: Router = express.Router();

router.get('/productos', getProductos);
router.get('/caracteristicas',getCaracteristicas);
router.post('/nuevoProducto', uploadImagenProducto, uploadFileToFtp('imagenesProducto'), postNuevoProducto );
router.post('/caracteristicaProducto', postCaracteristicaProducto );
export default router;