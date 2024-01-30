import express, { Router } from 'express';
import { procesarImagenes, borrarProcesamiento } from '../controller/procesamientoController';
import { procesamientoValidator } from '../validator/procesamientoValidator';
import { uploadImagenProcesada, uploadImagenRepresentativa } from '../config/multer';
import { uploadFileToFtp, uploadFileToFtpReferencia } from '../config/ftpUpload';


const router: Router = express.Router();

router.post('/procesamiento', uploadImagenProcesada, uploadFileToFtp('imagenesProcesamiento'), procesamientoValidator, procesarImagenes);

router.post('/subirImagen', uploadImagenRepresentativa, uploadFileToFtpReferencia);

router.delete('/borrarProcesamiento/:id_procesado', borrarProcesamiento);

export default router;