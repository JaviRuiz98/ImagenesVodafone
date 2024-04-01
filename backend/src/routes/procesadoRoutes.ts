import express, { Router } from 'express';
import { procesarImagenes, borrarProcesado, feedbackProcesado, getProcesadosByIdAuditoria, getProcesadosByIdExpositor, getProcesadosAndTiempo } from '../controller/procesadoController';
import { procesadoValidator } from '../validator/procesadoValidator';
import { uploadImagenProcesada, uploadImagenRepresentativa } from '../config/multer';
import { uploadFileToFtpReferencia, uploadFileToFtp } from '../config/ftpUpload';


const router: Router = express.Router();

router.post('/procesado', uploadImagenProcesada, uploadFileToFtp('imagenesProcesamiento'), procesadoValidator, procesarImagenes);
// router.post('/procesado', uploadImagenProcesada, procesadoValidator, procesarImagenes); // si el servidor ftp no funciona

router.post('/subirImagen', uploadImagenRepresentativa, uploadFileToFtpReferencia);

router.delete('/borrarProcesado/:id_procesado_imagen', borrarProcesado);

router.post('/feedbackProcesado', feedbackProcesado );

router.get('/procesados/:id_auditoria', getProcesadosByIdAuditoria );
router.get('/procesadosByExpositor/:id_expositor', getProcesadosByIdExpositor );

router.get('/estadisticas/procesados_and_tiempo', getProcesadosAndTiempo );

export default router;