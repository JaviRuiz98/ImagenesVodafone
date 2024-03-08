import { Request, Response } from 'express';
import { loginService } from '../services/loginService';

export async function verificarUsuario(req: Request, res: Response) {
    try {
        const { usuario, password } = req.body;
        const existe = loginService.existeUsuario(usuario);
        if (!existe) {
            res.status(400).json({ error: 'El usuario no existe' });
            return;
        }
        console.log(usuario, password);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        throw error;
    }
}

