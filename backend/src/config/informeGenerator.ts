import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

export function createPDF(): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    // Crear un documento PDF
    const doc = new PDFDocument();

    const stream = new PassThrough();

    // Título
    doc.fontSize(25).text('Auditoría para la tienda - SFID', {
      align: 'center'
    });

    // Espaciado después del título
    doc.moveDown(2);

    // Lista de conceptos (modificar según sea necesario)
    const conceptos = [
      'Concepto 1',
      'Concepto 2',
      'Concepto 3',
    ];

    // Añadir conceptos con espacio para rellenar
    conceptos.forEach(concepto => {
      doc.fontSize(12).text(`${concepto}:`, {
        continued: true,
        align: 'left'
      }).text(' ________________________', {
        align: 'right',
        continued: false
      });

      doc.moveDown(0.5);
    });

    // Finalizar PDF
    doc.end();

    // Recolectar los datos del stream en un Buffer
    let buffers: Buffer[] = [];
    stream.on('data', (data) => buffers.push(data));
    stream.on('end', () => resolve(Buffer.concat(buffers)));
    stream.on('error', (error) => reject(error));

    // Es importante conectar el doc a stream DESPUÉS de configurar los manejadores de eventos
    doc.pipe(stream);
  });
}