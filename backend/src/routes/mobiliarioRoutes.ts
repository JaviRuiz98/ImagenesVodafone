import express, { Router } from 'express';
import { getFilteredMuebles } from '../controller/mobiliarioController';


const router: Router = express.Router();

router.post('/muebles',  getFilteredMuebles);

export default router