import express, { Router } from 'express';
import { createMueble, getAllMuebles, getFilteredMuebles, updateMueble } from '../controller/mobiliarioController';


const router: Router = express.Router();

router.post('/muebles',  getFilteredMuebles);
router.get('/muebles',  getAllMuebles);
router.post('/createMueble/',  createMueble);
router.put('/muebles/:id_mueble',  updateMueble);

export default router