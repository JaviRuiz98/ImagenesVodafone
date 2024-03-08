
import express, { Router } from 'express';
import { getProductos, getCaracteristicas } from '../controller/uniformesController';

const router: Router = express.Router();

router.get('/productos', getProductos);
router.get('/caracteristicas', getCaracteristicas);