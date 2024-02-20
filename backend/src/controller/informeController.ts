import { Request, Response } from 'express';
import { jsPDF } from 'jspdf';


export async function informe(_req: Request, _res: Response) {
    let documento = new jsPDF();
    documento.setFont("helvetica","bold"); 
    documento.text('Hola mundo', 20, 20);
    documento.save('-Consumos.pdf');
}