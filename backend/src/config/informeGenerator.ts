import PDFDocument from 'pdfkit';
import fs from 'fs';

export function createPDF(outputPath: string) {
  // Crear un documento PDF
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(outputPath));

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
}
