import express from 'express';
import { crearUsuario, verificarExistenciaUsuario } from '../controller/loginController';

const router = express.Router();

router.post('/usuarios', verificarExistenciaUsuario('login'));
router.post('/nuevoUsuario', verificarExistenciaUsuario('nuevoUsuario'), crearUsuario);

export default router;
