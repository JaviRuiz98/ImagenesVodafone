import puppeteer from 'puppeteer';

export async function createPDF(url: string, texto_cifrado: string): Promise<Buffer> {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url+texto_cifrado, { waitUntil: 'networkidle0' });

  await page.evaluate(() => { // espero un segundo para que la pagina se cargue
    return new Promise(resolve => {
      setTimeout(resolve, 1000); // Espera 1000 ms
    });
  });

  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();
  return pdf;
}


