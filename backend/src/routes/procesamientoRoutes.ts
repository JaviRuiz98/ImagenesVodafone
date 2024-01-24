import express, { Router } from 'express';

import { procesarImagenes } from '../controller/procesamientoController';
import { procesamientoValidator } from '../validator/procesamientoValidator';
import { uploadImagenProcesada } from '../config/multer';
import { uploadFileToFtp, uploadFileToFtpPruebas } from '../config/ftpUpload';


const router: Router = express.Router();

router.post('/procesamiento', uploadImagenProcesada, uploadFileToFtp('imagenesProcesamiento'), procesamientoValidator, procesarImagenes);

router.post('/subirImagen', uploadImagenProcesada, uploadFileToFtpPruebas);

export default router;