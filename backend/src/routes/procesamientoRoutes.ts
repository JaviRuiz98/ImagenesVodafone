import express, { Router } from 'express';

import { procesarImagenes } from '../controller/procesamientoController';
import { procesamientoValidator } from '../validator/procesamientoValidator';
import { uploadSingleFileToFtp } from '../config/ftpUpload';
import { uploadImagenProcesada } from '../config/multer';


const router: Router = express.Router();

router.post('/procesamiento', uploadImagenProcesada,  uploadSingleFileToFtp('imagenesProcesamiento'), procesamientoValidator, procesarImagenes);

export default router;