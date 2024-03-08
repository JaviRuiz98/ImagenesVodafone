import express from 'express';
import { verificarUsuario } from '../controller/loginController';

const router = express.Router();

router.post('/usuarios', verificarUsuario)

export default router;
