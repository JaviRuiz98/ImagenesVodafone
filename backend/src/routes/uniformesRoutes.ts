import express, { Router } from 'express';
import { getProductos, getPedidos, getCarrito, getCaracteristicas, postNuevoProducto, postCaracteristicaProducto,tramitarPedido, } from '../controller/uniformesController';
import {  uploadImagenProducto } from '../config/multer';
import { uploadFileToFtp } from '../config/ftpUpload'; 
const router: Router = express.Router();

router.get('/productos', getProductos);
router.get('/pedidos', getPedidos);
router.get('/carritos', getCarrito);
router.get('/caracteristicas',getCaracteristicas);
router.post('/nuevoProducto', uploadImagenProducto, uploadFileToFtp('imagenesProducto'), postNuevoProducto );
router.post('/caracteristicaProducto', postCaracteristicaProducto );
router.post('/tramitar-pedido', tramitarPedido);

export default router;