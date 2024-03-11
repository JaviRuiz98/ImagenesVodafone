import express from 'express';
import { crearUsuario, verificarExistenciaUsuario, verificarPassword } from '../controller/loginController';

const router = express.Router();

router.post('/usuarios', verificarExistenciaUsuario('login'), verificarPassword);
router.post('/nuevoUsuario', verificarExistenciaUsuario('nuevoUsuario'), crearUsuario);

export default router;
