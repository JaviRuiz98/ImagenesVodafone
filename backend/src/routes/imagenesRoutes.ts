import express, { Router } from 'express';
import { getDestination } from '../config/multer';
import { getImagenesProcesado, getImagenesReferencia } from '../controller/imagenesController';


const router: Router = express.Router();

router.use('/imagenesReferencia',  express.static(getDestination('imagenesReferencia')));
router.use('/imagenesProcesamiento',  express.static(getDestination('imagenesProcesamiento')));

router.get('/imagenesReferencia/:nombre', getImagenesReferencia );
router.get('/imagenesProcesamiento/:nombre', getImagenesProcesado );



export default router;