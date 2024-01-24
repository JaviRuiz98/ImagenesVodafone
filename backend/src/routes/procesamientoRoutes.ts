import express, { Router } from 'express';

import { procesarImagenes } from '../controller/procesamientoController';
import { procesamientoValidator } from '../validator/procesamientoValidator';
<<<<<<< Updated upstream
import { uploadImagenProcesada } from '../config/multer';
import { uploadFileToFtp } from '../config/ftpUpload';
=======
import { uploadImagenProcesada, uploadImagenRepresentativa } from '../config/multer';
import { uploadFileToFtp, uploadFileToFtpReferencia } from '../config/ftpUpload';
>>>>>>> Stashed changes


const router: Router = express.Router();

router.post('/procesamiento', uploadImagenProcesada, uploadFileToFtp('imagenesProcesamiento'), procesamientoValidator, procesarImagenes);

<<<<<<< Updated upstream
=======
router.post('/subirImagen', uploadImagenRepresentativa, uploadFileToFtpReferencia);
>>>>>>> Stashed changes

export default router;