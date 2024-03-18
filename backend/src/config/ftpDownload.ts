import { Client } from 'basic-ftp';
import fs from 'fs';
import path from 'path';

export const downloadImageFtp: (url_image_ftp: string) => Promise<string> = async function (url_image_ftp) {
    // Configurar cliente FTP
    const client = new Client();

    try {
        //client.ftp.verbose = true;

        await client.access({
            host: process.env.HOST_FTP,
            user: process.env.USER_FTP,
            password: process.env.PASSWORD_FTP,
        });

        // Extraer el nombre de archivo de la URL
        const file_name = path.basename(url_image_ftp);

        // Definir la ruta donde se guardará la imagen temporalmente
        const filePath = path.join(__dirname, '..', '..', 'assets', 'temp', file_name);
        console.log('tempDownloadPath:', filePath);
        console.log('url_image_ftp:', url_image_ftp);

        // Asegurarse de que la carpeta temp existe
        const tempDir = path.join(__dirname, '..', '..', 'assets', 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        // Descargar la imagen del servidor FTP
        await client.downloadTo(filePath, url_image_ftp);

        // Devolver la ruta local de la imagen descargada
        // Cambio: Se devuelve la ruta local de la imagen en lugar de la respuesta de una API
        return filePath;
    } catch (error) {
        console.error("Error descargando la imagen del FTP:", error);
        throw error;
    } finally {
        // Cerrar la sesión FTP
        await client.close();
    }
}