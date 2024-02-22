import { Request, Response } from 'express';
import { createPDF } from '../config/informeGenerator';

export async function generarInformeAuditoria(req: Request, res: Response) {
    const id_auditoria = parseInt(req.body.id_auditoria);
    console.log('Generando informe para la auditoria ' + id_auditoria);

    try {
        createPDF('assets/informes/' + id_auditoria + '.pdf');
        console.log('Generando informe para la auditoria ' + id_auditoria);
        res.status(200).json({ message: 'Informe generado exitosamente' });
    } catch (error) {
        console.error('No se pudo generar el informe:', error);
        res.status(500).json({ error: 'Internal server error, no se pudo generar el informe' });
    }
}

