import express, { Router } from 'express';
import { getAllMuebles } from '../controller/mobiliarioController';


const router: Router = express.Router();

router.post('/muebles',  getAllMuebles);

export default router