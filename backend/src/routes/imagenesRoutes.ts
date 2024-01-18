import express, { Router } from 'express';
import { getDestination } from '../config/multer';
import { getImagenesProcesado, getImagenesReferencia } from '../controller/imagenesController';


const router: Router = express.Router();


router.use('/imagenesReferencia',  express.static(getDestination('imagen_referencia')));
router.use('/imagenesProcesada',  express.static(getDestination('imagen_procesamiento')));

router.get('/imagenesReferencia/:nombre', getImagenesReferencia );
router.get('/imagenesProcesada/:nombre', getImagenesProcesado );

