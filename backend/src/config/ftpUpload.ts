import { NextFunction, Request, Response } from "express";

const ftp = require('basic-ftp');

const config = {
    host: process.env.HOST_FTP,
    user: process.env.USER_FTP,
    password: process.env.PASSWORD_FTP,

}

const uploadFile = async (localPath: string, remotePath: string) => {
    const client = new ftp.Client();
    try{  
        await client.access(config);
        console.log('Conectado a servidor FTP');

        await client.uploadFrom(localPath, remotePath);
        console.log('Archivo subido');
    } catch (error) {
        console.log('Error al subir al archivo:', error);
        throw error;
    } finally{
         client.close();
    }
   
}

export const  uploadFileToFtp = (foldername:string) => async (req: Request, res: Response, next: NextFunction) => {
    
    const file: any = req.file;
    if (!file) {
        return res.status(400).json({ error: 'Imagen no encontrado' });
        
    }else{
        const localPath = file.path;
        const remotePath = `./imagenes/${foldername}/${file.filename}`;

        try {
            await uploadFile(localPath, remotePath); //creo que no hay que poner await porque se puede ir haciendo asincronamente
            return next();
        } catch (error) {
            console.error('Error al subir al archivo:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        
    }

    
}

export const uploadMultipleFilesToFtp = (folderName: string, opcional: boolean = false) => async (req: Request, res: Response, next: NextFunction) => {
    // `req.files` debe ser tratado como un array de archivos
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
        if (opcional) return next();
        console.error('No se encontraron imágenes');
        return res.status(400).json({ error: 'No se encontraron imágenes' });
    }

    // Procesa cada archivo de manera asincrónica
    const uploadPromises = files.map(async (file) => {
        const localPath = file.path;
        const remotePath = `./imagenes/${folderName}/${file.filename}`;

        try {
            return uploadFile(localPath, remotePath);
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            // Lanzar el error para manejarlo más adelante
            throw new Error('Error al subir el archivo: ' + error);
        }
    });

    try {
        // Espera a que todas las cargas se completen
        await Promise.all(uploadPromises);
        return next();
    } catch (error) {
        // Si cualquier carga falla, captura el error aquí
        console.error('Error al subir archivos:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const  uploadFileToFtpReferencia = (foldername:string) => async (req: Request, res: Response) => {
    
    const files =  req.files
    if (!files || !Array.isArray(files)) {
        return res.status(400).json({ error: 'Imagen no encontrado' });
        
    }else{
        
        try {
            for (let i = 0; i < files.length; i++) {
                const localPath = files[i].path;
                const remotePath =`./imagenes/${foldername}/${files[i].originalname}`;
                await uploadFile(localPath, remotePath); 
            }
           
     
            return res.status(200).json({ message: 'Imagen subida correctamente' });
        } catch (error) {
            console.error('Error al subir al archivo:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        
    }

    
}