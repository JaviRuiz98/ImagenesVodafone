import puppeteer from 'puppeteer';

export async function createPDF(url: string, texto_cifrado: string): Promise<Buffer> {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url+texto_cifrado, { waitUntil: 'networkidle2' });

  const pdf = await page.pdf({ 
    path: 'reporte.pdf', // El nombre de tu archivo PDF
    format: 'A4',
    printBackground: true, // Imprime el fondo si es necesario
    margin: {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm'
    }
  });
  await browser.close();
  return pdf;
}


