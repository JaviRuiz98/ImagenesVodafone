import { Request, Response, NextFunction } from 'express';
import { loginService } from '../services/loginService';
import * as crypto from 'crypto';

export const verificarExistenciaUsuario = (foldername:string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { usuario } = req.body;
        const existe = await loginService.existeUsuario(usuario);
        if (!existe && foldername === 'login') {
            res.status(200).json('El usuario no existe.');
            return;
        }
        return next();
        
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        throw error;
    }
}

export async function crearUsuario(req: Request, res: Response) {
    try {
        const { usuario, password } = req.body;
        const passwordCifrada = hashPassword(password);
        await loginService.insertarUsuario(usuario, passwordCifrada);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        throw error;
    }
}

function hashPassword(password: string): string {
    const hash = crypto.createHmac('sha256', process.env.HASH_SECRET!);
    hash.update(password);
    return hash.digest('hex');
}

  
