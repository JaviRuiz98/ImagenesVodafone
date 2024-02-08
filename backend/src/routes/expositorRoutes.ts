import express, { Router } from 'express';
import {getExpositores} from '../controller/expositorController';

import { uploadImagenProcesada } from '../config/multer';
import { uploadFileToFtp } from '../config/ftpUpload';


// import { procesadoValidator } from '../validator/procesadoValidator';
// import { uploadImagenProcesada, uploadImagenRepresentativa } from '../config/multer';
// import { uploadFileToFtp, uploadFileToFtpReferencia } from '../config/ftpUpload';

const router: Router = express.Router();


router.use('/expositor', uploadImagenProcesada, uploadFileToFtp('imagenesReferencia'), );
router.get('/expositores', getExpositores);

// router.post('/procesado', uploadImagenProcesada, uploadFileToFtp('imagenesProcesamiento'), procesadoValidator, procesarImagenes);

export default router;