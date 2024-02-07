import express, { Router } from 'express';
import {  uploadImagenRepresentativa } from '../config/multer';
import {  uploadFileToFtpReferencia } from '../config/ftpUpload';
import { getExpositores, deleteExpositor,createExpositor } from '../controller/expositorController';


const router: Router = express.Router();


router.post('/expositor',  uploadImagenRepresentativa, uploadFileToFtpReferencia, createExpositor);
router.get('/expositores', getExpositores);
router.delete('/expositor/:id_expositor', deleteExpositor);


export default router;