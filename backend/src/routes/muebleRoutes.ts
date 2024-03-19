import express, { Router } from 'express';
import { updateMuebleForm, getAllMuebles, getFilteredMuebles, getMueblesAndExpositoresActivosByIdTienda, updateExpositor } from '../controller/muebleController';
import { uploadArrayImagenRepresentativa } from '../config/multer';
import {  uploadMultipleFilesToFtp } from '../config/ftpUpload';
import { validateGetFilteredMuebles, validateMuebleByIdTienda, validateUpdateExpositor } from '../validator/muebleValidator';


const router: Router = express.Router();


router.post('/muebles', validateGetFilteredMuebles,  getFilteredMuebles);
router.post('/createMueble/',  uploadArrayImagenRepresentativa, uploadMultipleFilesToFtp('imagenesReferencia', true), updateMuebleForm);
router.get('/muebles',  getAllMuebles);
router.get('/muebles/:id_tienda',validateMuebleByIdTienda, getMueblesAndExpositoresActivosByIdTienda);
router.put('/expositores/:id', validateUpdateExpositor, updateExpositor);

export default router