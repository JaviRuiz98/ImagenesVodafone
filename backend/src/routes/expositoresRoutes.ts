import express, { Router } from 'express';

import { getExpositores, deleteExpositor } from '../controller/expositorController';


const router: Router = express.Router();


router.get('/expositores', getExpositores);
router.delete('/expositor/:id_expositor', deleteExpositor );


export default router;