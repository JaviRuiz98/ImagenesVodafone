import { Request, Response } from 'express';
import { sendEmail } from '../services/emailService';

export async function enviarInforme(req: Request, res: Response) {
    const { to, subject, message } = req.body;

    try {
        await sendEmail(to, subject, message);
        console.log('Enviando informe para la auditoria ' + req.body.id_auditoria);
        res.status(200).json({ body: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error, no se pudo enviar el informe' });
    }
}
