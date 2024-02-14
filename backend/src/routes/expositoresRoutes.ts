import express, { Router } from 'express';
import {  uploadImagenRepresentativa } from '../config/multer';
import { getExpositores, deleteExpositor,guardarExpositor,editarEstadoExpositor,getRegionesDisponibles,getExpositoresByIdMueble } from '../controller/expositorController';
import { uploadFileToFtp } from '../config/ftpUpload'; 

const router: Router = express.Router();

router.get('/expositores', getExpositores);
router.delete('/expositor/:id_expositor', deleteExpositor);

router.post('/expositor', uploadImagenRepresentativa, uploadFileToFtp('imagenesReferencia'), guardarExpositor);

router.post('/expositorActivaDesactiva', editarEstadoExpositor);

router.get('/regiones', getRegionesDisponibles);

router.get('/expositores/:id_mueble', getExpositoresByIdMueble);

export default router;