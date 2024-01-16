import express from 'express';
import { uploadImagenProcesada } from '../config/multer';
import { procesarImagenes } from '../controller/procesamientoController';
import { procesamientoValidator } from '../validator/procesamientoValidator';


const router = express.Router();

router.post('/procesamiento',  uploadImagenProcesada, procesamientoValidator, procesarImagenes);