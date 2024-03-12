import express, { Router } from 'express';
import { createMueble, getAllMuebles, getFilteredMuebles, getMueblesAndExpositoresActivosByIdTienda, updateExpositor, updateMueble } from '../controller/mobiliarioController';
import { uploadArrayImagenRepresentativa } from '../config/multer';
import {  uploadMultipleFilesToFtp } from '../config/ftpUpload';


const router: Router = express.Router();


router.post('/muebles',  getFilteredMuebles);
router.post('/createMueble/',  uploadArrayImagenRepresentativa, uploadMultipleFilesToFtp('imagenesReferencia', true), createMueble);
router.put('/muebles/:id_mueble',  updateMueble);
router.get('/muebles',  getAllMuebles);
router.get('/muebles/:id_tienda',  getMueblesAndExpositoresActivosByIdTienda);
router.put('/expositores/:id', updateExpositor);

export default router