import { Request, Response } from 'express';
import { createPDF } from '../config/informeGenerator';

export async function generarInformeAuditoria(id_auditoria: number) {
    console.log('Generando informe para la auditoria ' + id_auditoria);

    try {
        createPDF('assets/informes/' + id_auditoria + '.pdf');
        console.log('Generando informe para la auditoria ' + id_auditoria);
    } catch (error) {
        console.error('No se pudo generar el informe:', error);
    }
}

export async function descargarInformeAuditoria(req: Request, res: Response) {
    const id_auditoria = req.body.id_auditoria;

    try {
        await generarInformeAuditoria(id_auditoria);
        res.status(200).json({ message: 'Informe generado' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

