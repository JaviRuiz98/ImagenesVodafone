import express, { Router } from 'express';
import { getDestination } from '../config/multer';
import { getImagenesProcesado, getImagenesReferencia } from '../controller/imagenesController';


const router: Router = express.Router();

// Comprobar si se usa y si no eliminarlas
router.use('/imagenesReferencia',  express.static(getDestination('imagenesReferencia')));
router.use('/imagenesProcesamiento',  express.static(getDestination('imagenesProcesamiento')));

// Leer imagen a través de ruta estática
router.get('/imagenesReferencia/:nombre', getImagenesReferencia );
router.get('/imagenesProcesamiento/:nombre', getImagenesProcesado );



export default router;