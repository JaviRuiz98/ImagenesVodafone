
import express from 'express';
import { getAllTiendas } from '../controller/tiendasController';

const router = express.Router();

router.get('/tiendas',getAllTiendas);