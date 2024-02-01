import express, { Router } from 'express';
import { getAllMuebles } from '../controller/mobiliarioController';


const router: Router = express.Router();

router.use('/muebles',  getAllMuebles);

export default router