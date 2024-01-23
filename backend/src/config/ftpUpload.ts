import { Client } from 'basic-ftp';
import { NextFunction, Request, Response } from 'express';
import path from 'path';

// Configuración del cliente FTP
const client = new Client();
client.ftp.verbose = true; // Para logs detallados, poner en false para producción

// Función para conectarse al servidor FTP y subir un archivo
async function uploadToFtp(folderPath:string, file:any ) {
  try {
    await client.access({
      host: process.env.HOST_FTP,
      user: process.env.USER_FTP,
      password: process.env.PASSWORD_FTP,
      secure: true 
    });
    await client.ensureDir(folderPath);
    await client.uploadFrom(file.path, file.filename);
  } catch (error) {
    console.error(error);
  }
}

// Middleware para cargar archivos
const uploadMiddleware = (folderName: string) => async (req: Request, _res: Response, next: NextFunction) => {
  if (!req.files) {
    return next();
  }

  const folderPath = path.join(__dirname, '..', '..', 'assets', 'imagenes', folderName);

  if (typeof req.files === 'object' && !Array.isArray(req.files)) {
    const fieldNames = Object.keys(req.files);
 // If req.files is an object with field names as keys and arrays of files as values
    for (const fieldName of fieldNames) {
      const files = req.files[fieldName];
      for (const file of files) {
        await handleFileUpload(file, folderPath);
      }
    }
  }
  // If req.files is an array of files
  else if (Array.isArray(req.files)) {
    for (const file of req.files) {
      await handleFileUpload(file, folderPath);
    }
  }

  next();
};

async function handleFileUpload(file: Express.Multer.File, folderPath: string) {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const fileName = `${uniqueSuffix}${path.extname(file.originalname)}`;
  file.filename = fileName;

  try {
    await uploadToFtp(folderPath, file);
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

function getDestination(folderPath: string): string {
  return  path.join(__dirname, '..', '..', 'assets', 'imagenes', folderPath);
 }

export { uploadMiddleware };
