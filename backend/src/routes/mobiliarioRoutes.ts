import express, { Router } from 'express';
import { createMueble, getAllMuebles, getFilteredMuebles, getMueblesAndExpositoresActivosByIdTienda, updateMueble } from '../controller/mobiliarioController';


const router: Router = express.Router();

router.post('/muebles',  getFilteredMuebles);
router.post('/createMueble/',  createMueble);

router.put('/muebles/:id_mueble',  updateMueble);

router.get('/muebles',  getAllMuebles);
router.get('/muebles/:id_tienda',  getMueblesAndExpositoresActivosByIdTienda);

export default router