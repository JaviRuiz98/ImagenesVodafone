import express, { Router } from 'express';
import {getExpositores, guardarExpositor} from '../controller/expositorController';

// import { uploadImagenProcesada } from '../config/multer';
// import { uploadFileToFtp } from '../config/ftpUpload';


// import { procesadoValidator } from '../validator/procesadoValidator';
import { uploadImagenRepresentativa } from '../config/multer';
import { uploadFileToFtp } from '../config/ftpUpload';

const router: Router = express.Router();


//router.use('/expositor', uploadImagen Procesada, uploadFileToFtp('imagenesReferencia'), );
router.get('/expositores', getExpositores);

router.post('/expositor', uploadImagenRepresentativa, uploadFileToFtp('imagenesReferencia'), guardarExpositor);

export default router;