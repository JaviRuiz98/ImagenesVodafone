import { Request, Response, NextFunction } from 'express';
import { loginService } from '../services/loginService';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
// import { JwtPayload } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET; 

export const verificarExistenciaUsuario = (foldername:string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { usuario } = req.body;
        const existe = await loginService.existeUsuario(usuario);
        if (!existe && foldername === 'login') {
            res.status(200).json('El usuario no existe.');
            return;
        } else if(existe && foldername === 'nuevoUsuario') {
            res.status(200).json('El usuario ya existe.');
        }
        return next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        throw error;
    }
}

export async function verificarPassword(req: Request, res: Response) {
    try {
        const { usuario, password } = req.body;
        const passwordCifrada = hashPassword(password);
        const passwordBD = await loginService.getPasswordByUsuario(usuario);
        if(passwordBD.password !== passwordCifrada){
            res.status(200).json('Contraseña incorrecta!');
        } else {
            const token = crearToken(req.body.usuario);
            res.status(200).json({ token });
        }
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
        res.status(200).json('Usuario creado!');    
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

function crearToken(usuario:string) {
    const token = jwt.sign({ usuario: usuario }, secretKey!, { expiresIn: '1h' });
    return token;
}
