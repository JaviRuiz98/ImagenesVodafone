import express, { Router } from 'express';
import {  uploadImagenRepresentativa } from '../config/multer';
import {  deleteElemento, guardarElemento,editarEstadoElemento,getRegionesDisponibles } from '../controller/expositorController';
import { uploadFileToFtp } from '../config/ftpUpload'; 
import { getElementos } from '../controller/expositorController';

const router: Router = express.Router();

router.get('/elementos', getElementos);
router.delete('/elementos/:id_elementos', deleteElemento);

router.post('/elementos', uploadImagenRepresentativa, uploadFileToFtp('imagenesReferencia'), guardarElemento);

router.post('/elementosActivaDesactiva', editarEstadoElemento);

router.get('/regiones', getRegionesDisponibles);

// router.get('/elementoses/:id_mueble', getelementosesByIdMueble);

export default router;