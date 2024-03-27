import express, { Router } from 'express';
import {  uploadImagenRepresentativa } from '../config/multer';
import {  deleteElemento, guardarElemento,editarEstadoElemento,getRegionesDisponibles, getCategorias_elementos, getResumenEstadisticasElementos, getElementosEstadisticas } from '../controller/elementoController';
import { uploadFileToFtp } from '../config/ftpUpload'; 
import { getElementos, getElementosActivos } from '../controller/elementoController';

const router: Router = express.Router();

router.get('/elementos', getElementos);
router.get('/elementosActivos', getElementosActivos);
router.get('/categorias_elementos', getCategorias_elementos);
router.delete('/elementos/:id_elementos', deleteElemento);

router.post('/elemento', uploadImagenRepresentativa, uploadFileToFtp('imagenesReferencia'), guardarElemento);

router.post('/elementoActivaDesactiva', editarEstadoElemento);

router.get('/regiones', getRegionesDisponibles);
 
router.get('/estadisticas/elementos', getResumenEstadisticasElementos);
router.get('/estadisticas/carteles',getElementosEstadisticas('carteles'));
router.get('/estadisticas/dispositivos',getElementosEstadisticas('conteo'));
export default router;