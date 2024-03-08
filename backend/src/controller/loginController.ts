import { Request, Response } from 'express';
import { loginService } from '../services/loginService';

export async function verificarUsuario(req: Request, res: Response) {
    try {
        const { usuario } = req.body;
        const existe = await loginService.existeUsuario(usuario);
        if (!existe) {
            res.status(200).json('El usuario no existe.');
            return;
        } else{
            return res.status(200).json('El usuario existe.');
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        throw error;
    }
}

