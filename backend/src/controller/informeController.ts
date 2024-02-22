import { Request, Response } from 'express';
import { createPDF } from '../config/informeGenerator';

export async function  generarInformeAuditoria(req: Request, res: Response) {
    try {
        const id_auditoria = req.body.id_auditoria;
        console.log('Generando informe para la auditoria ' + id_auditoria);

        const pdfBuffer = await createPDF();

        res.setHeader('Content-Type', 'application/pdf');
        res.status(200).send(pdfBuffer);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
