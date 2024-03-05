import puppeteer from 'puppeteer';

export async function createPDF(url: string, texto_cifrado: string, usuario: string): Promise<Buffer> {
  const fecha = new Date().toLocaleDateString();
  const hora = new Date().toLocaleTimeString();

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
    },
    displayHeaderFooter: true,
    footerTemplate: `
      <div style="width:100%; font-size:10px; padding:5px; margin-left:20px;">
        Usuario: ${usuario} - Fecha: ${fecha} - ${hora} <span style="margin-left:10px;"></span>
        <span style="float:right; margin-right:20px;">
          Página <span class="pageNumber"></span> de <span class="totalPages"></span>
        </span>
      </div>`,
    headerTemplate: '<div></div>'
  });
  await browser.close();
  return pdf;
}


