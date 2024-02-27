import * as CryptoJS from 'crypto-js';

export async function cifrarDatos(id: string, secretKey: string): Promise<string> {
  const datosString = JSON.stringify(id);
  const texto_cifrado = CryptoJS.AES.encrypt(datosString, secretKey ).toString();
  // Convertir a base64 URL-safe
  const base64 = texto_cifrado.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  console.log('Id auditoria cifrado y seguro para URL: ' + base64);
  return base64;  
}

export async function descifrarDatos(ciphertext: string, secretKey: string): Promise<number> {
  let base64 = ciphertext.replace(/-/g, '+').replace(/_/g, '/');
  switch (base64.length % 4) { // Añadir el relleno de '=' necesario
    case 0:
      break; // No se necesita relleno
    case 2:
      base64 += '==';
      break;
    case 3:
      base64 += '=';
      break;
    default:
      throw new Error('String base64url ilegal');
  }
  const bytes = CryptoJS.AES.decrypt(base64, secretKey);
  const datosDescifrados = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return datosDescifrados;
}