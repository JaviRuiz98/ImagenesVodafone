import { Request, Response } from 'express';
import { auditoriaService } from '../services/auditoriaService';
import { getNumberArrayProgresoAuditoria } from './auditoriaController';
import { createPDF } from '../config/informeGenerator';
import { sendEmail } from '../services/emailService';
import { cifrarDatos, descifrarDatos } from '../config/crypt';

export async function  generarInformeAuditoria(req: Request, res: Response) {
    try {
        const id_auditoria = req.body.id_auditoria;

        const texto_cifrado = await cifrarDatos(id_auditoria, process.env.CRYPT_SECRET_KEY || '');

        const direccion_url_template = process.env.URL_FRONTEND + 'templateInforme/';
        const pdfBuffer = await createPDF(direccion_url_template, texto_cifrado);

        res.setHeader('Content-Type', 'application/pdf');
        res.status(200).send(pdfBuffer);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        throw error;
    }
}

export async function enviarInforme(req: Request, res: Response) {
    const { id_auditoria } = req.body;

    // Informacion del envio del correo electronico, posteriormente se detectara segun sfid, auditoria u otro parametro
    const to: string = 'raul.perez@tdconsulting.es';
    const subject: string = 'Reporte de auditoria';
    const message: string = 'Se ha terminado la auditoria ' + id_auditoria + '. Adjunto se remite el informe de auditoria.\n Muchas gracias';

    try {
        console.log('Generando informe para la auditoria ' + id_auditoria);

        const direccion_url_template = process.env.URL_FRONTEND + 'templateInforme/';
        const pdfBuffer = await createPDF(direccion_url_template, id_auditoria);        
        const nombre_archivo = 'informe_' + id_auditoria + '.pdf';

        await sendEmail(to, subject, message, pdfBuffer, nombre_archivo);

        console.log('Enviando informe para la auditoria ' + id_auditoria);
        res.status(200).json({ message: 'Se ha enviado el informe por correo' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error, no se pudo enviar el informe' });
    }
}

export async function getDatosInformeAuditoria (req: Request, res: Response): Promise<any> {
    try {
        const id_auditoria_cifrada = req.params.id_auditoria_cifrada;
        console.log('Id auditoria cifrado: ' + id_auditoria_cifrada);

        let id_auditoria: number = await descifrarDatos(id_auditoria_cifrada, process.env.CRYPT_SECRET_KEY || '');
        if(typeof id_auditoria !== 'number') {
            id_auditoria = parseInt(id_auditoria);
        }
        console.log('Id auditoria descifrado: ' + id_auditoria);

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
        console.log
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getUrlDadoIdAuditoria (req: Request, res: Response): Promise<any> {
    try {
        const id_auditoria = String(req.params.id_auditoria);
        const id_auditoria_cifrada = await cifrarDatos(id_auditoria, process.env.CRYPT_SECRET_KEY || '');
        console.log('Id auditoria cifrado: ' + id_auditoria_cifrada);
        res.status(200).json(id_auditoria_cifrada);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


