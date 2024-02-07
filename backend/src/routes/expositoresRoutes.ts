import express, { Router } from 'express';

import { getExpositores } from '../controller/expositorController';


const router: Router = express.Router();


router.get('/expositores', getExpositores);


export default router;