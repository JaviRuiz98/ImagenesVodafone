import puppeteer from 'puppeteer';
import * as CryptoJS from 'crypto-js';

export async function createPDF(url: string, id_auditoria: number): Promise<Buffer> {
  const texto_cifrado = cifrarDatos(id_auditoria, process.env.CRYPT_SECRET_KEY!);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url+texto_cifrado, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();
  return pdf;
}

function cifrarDatos(id: number, secretKey: string): string {
  const datosString = JSON.stringify(id);
  const texto_cifrado = CryptoJS.AES.encrypt(datosString, secretKey ).toString();
  return texto_cifrado;
}
