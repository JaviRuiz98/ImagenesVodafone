import express, { Router } from 'express';
import { updateMuebleForm, getAllMuebles, getFilteredMuebles, getMueblesAndExpositoresActivosByIdTienda, updateExpositor } from '../controller/mobiliarioController';
import { uploadArrayImagenRepresentativa } from '../config/multer';
import {  uploadMultipleFilesToFtp } from '../config/ftpUpload';


const router: Router = express.Router();


router.post('/muebles',  getFilteredMuebles);
router.post('/createMueble/',  uploadArrayImagenRepresentativa, uploadMultipleFilesToFtp('imagenesReferencia', true), updateMuebleForm);
router.get('/muebles',  getAllMuebles);
router.get('/muebles/:id_tienda',  getMueblesAndExpositoresActivosByIdTienda);
router.put('/expositores/:id', updateExpositor);

export default router