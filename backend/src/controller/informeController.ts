import { Request, Response } from 'express';


export async function enviarInforme(req: Request, res: Response) {
    try {
        console.log('Enviando informe para la auditoria ' + req.body.id_auditoria);
        res.status(200).json({ body: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error, no se pudo enviar el informe' });
    }
}