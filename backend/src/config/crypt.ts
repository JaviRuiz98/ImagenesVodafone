import * as CryptoJS from 'crypto-js';

export async function cifrarDatos(id: string, secretKey: string): Promise<string> {
    const datosString = JSON.stringify(id);
    const texto_cifrado = CryptoJS.AES.encrypt(datosString, secretKey ).toString();
    return texto_cifrado;
  }

export async function descifrarDatos(ciphertext: string, secretKey: string): Promise<number> {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const datosDescifrados = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return datosDescifrados;
}