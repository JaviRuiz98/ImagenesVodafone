
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Request, Response } from 'express';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export async function informe(_req: Request, _res: Response) {
    // const pdfDefinition = {
    //     content: [
    //         'Hola mundo'
    //     ]
    // };
    //const pdf = pdfMake.createPdf(pdfDefinition);
    window.open();
}

