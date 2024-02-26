import { Request, Response } from 'express';
import { sendEmail } from '../services/emailService';

export async function enviarInforme(req: Request, res: Response) {
    const { id_auditoria } = req.body;

    // Informacion del envio del correo electronico, posteriormente se detectara segun sfid, auditoria u otro parametro
    const to: string = 'raul.perez@tdconsulting.es';
    const subject: string = 'Reporte de auditoria';
    const message: string = 'Se ha terminado la auditoria ' + id_auditoria;

    try {
        await sendEmail(to, subject, message);
        console.log('Enviando informe para la auditoria ' + id_auditoria);
        res.status(200).json({ body: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error, no se pudo enviar el informe' });
    }
}
