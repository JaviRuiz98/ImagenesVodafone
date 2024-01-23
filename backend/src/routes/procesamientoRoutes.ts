import express, { Router } from 'express';

import { procesarImagenes } from '../controller/procesamientoController';
import { procesamientoValidator } from '../validator/procesamientoValidator';
import { uploadMiddleware } from '../config/ftpUpload';


const router: Router = express.Router();

router.post('/procesamiento',  uploadMiddleware('imagenesProcesamiento'), procesamientoValidator, procesarImagenes);

export default router;