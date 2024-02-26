import { Request, Response } from 'express';
import { auditoriaService } from '../services/auditoriaService';
import { getNumberArrayProgresoAuditoria } from './auditoriaController';
import { createPDF } from '../config/informeGenerator';

export async function  generarInformeAuditoria(req: Request, res: Response) {
    try {
        const id_auditoria = req.body.id_auditoria;
        console.log('Generando informe para la auditoria ' + id_auditoria);

        
        // const informeData = await getDatosInformeAuditoria(id_auditoria);

        const direccion_url_template = process.env.URL_FRONTEND + 'templateInforme';
        const pdfBuffer = await createPDF(direccion_url_template, id_auditoria);

        res.setHeader('Content-Type', 'application/pdf');
        res.status(200).send(pdfBuffer);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        throw error;
    }
}

// export async function enviarInforme(req: Request, res: Response) {
//     const { id_auditoria } = req.body;

//     // Informacion del envio del correo electronico, posteriormente se detectara segun sfid, auditoria u otro parametro
//     const to: string = 'raul.perez@tdconsulting.es';
//     const subject: string = 'Reporte de auditoria';
//     const message: string = 'Se ha terminado la auditoria ' + id_auditoria + '. Adjunto se remite el informe de auditoria.\n Muchas Gracias';

//     try {
//         console.log('Generando informe para la auditoria ' + id_auditoria);

//         const informeData = await getDatosInformeAuditoria(id_auditoria);
//         const pdfBuffer = await createPDF(informeData);
//         const nombre_archivo = 'informe_' + id_auditoria + '.pdf';

//         await sendEmail(to, subject, message, pdfBuffer, nombre_archivo);
//         console.log('Enviando informe para la auditoria ' + id_auditoria);
//         res.status(200).json({ message: 'Se ha enviado el informe por correo' });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error, no se pudo enviar el informe' });
//     }
// }

export async function getDatosInformeAuditoria (req: Request, res: Response): Promise<any> {
    try {
        const id_auditoria = parseInt(req.params.id_auditoria);

        const [auditoria, num_expositores, num_expositores_procesados, datos_barra_progreso] = await Promise.all([
            auditoriaService.getAuditoriaAndTienda(id_auditoria),
            auditoriaService.getNumExpositoresByAuditoria(id_auditoria),
            auditoriaService.getNumExpositoresProcesadosByAuditoria(id_auditoria),
            getNumberArrayProgresoAuditoria(id_auditoria)
        ]);
    
        const auditoria_extended: any = {
            ...auditoria,
            num_expositores_procesados: num_expositores_procesados,
            num_expositores: num_expositores,
            datos_barra_progreso: datos_barra_progreso                     
        }

        res.status(200).json(auditoria_extended);    
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
