import express, { Router } from 'express';
import { procesarImagenes, borrarProcesado, feedbackProcesado, getProcesadosByIdAuditoria } from '../controller/procesadoController';
import { procesadoValidator } from '../validator/procesadoValidator';
import { uploadImagenProcesada, uploadImagenRepresentativa } from '../config/multer';
import { uploadFileToFtp, uploadFileToFtpReferencia } from '../config/ftpUpload';


const router: Router = express.Router();

router.post('/procesado', uploadImagenProcesada, uploadFileToFtp('imagenesProcesamiento'), procesadoValidator, procesarImagenes);

router.post('/subirImagen', uploadImagenRepresentativa, uploadFileToFtpReferencia);

router.delete('/borrarProcesado/:id_procesado_imagen', borrarProcesado);

router.post('/feedbackProcesado', feedbackProcesado );

router.get('/procesados', getProcesadosByIdAuditoria );


export default router;