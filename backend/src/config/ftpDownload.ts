import { Client } from 'basic-ftp';
import fs from 'fs';
import path from 'path';

export const downloadImageFtp: (url: string, image_name: string) => Promise<string> = async function (image_name) {
    try {
        // Configurar cliente FTP
        const client = new Client();
        client.ftp.verbose = true; // Opcional: Habilitar para ver detalles de la conexión y operaciones en la consola

        await client.access({
            host: process.env.HOST_FTP,
            user: process.env.USER_FTP,
            password: process.env.PASSWORD_FTP,
        });

        // Definir la ruta donde se guardará la imagen temporalmente
        const tempDownloadPath = path.join(__dirname, 'temp', image_name);

        // Asegurarse de que la carpeta temp existe
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        // Descargar la imagen del servidor FTP
        await client.downloadTo(tempDownloadPath, image_name);

        // Devolver la ruta local de la imagen descargada
        // Cambio: Se devuelve la ruta local de la imagen en lugar de la respuesta de una API
        return tempDownloadPath;
    } catch (error) {
        console.error("Error descargando la imagen del FTP:", error);
        throw error;
    }
}