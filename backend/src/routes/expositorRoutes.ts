import express, { Router } from 'express';
import { procesadoValidator } from '../validator/procesadoValidator';
import { uploadImagenProcesada, uploadImagenRepresentativa } from '../config/multer';
import { uploadFileToFtp, uploadFileToFtpReferencia } from '../config/ftpUpload';

const router: Router = express.Router();


router.use('/expositor', uploadImagenProcesada, uploadFileToFtp('imagenesReferencia'), );


router.post('/procesado', uploadImagenProcesada, uploadFileToFtp('imagenesProcesamiento'), procesadoValidator, procesarImagenes);

export default router;