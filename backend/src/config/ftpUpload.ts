import { NextFunction, Request, Response } from "express";

const ftp = require('basic-ftp');

const config = {
    host:process.env.HOST_FTP,
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
            uploadFile(localPath, remotePath); //creo que no hay que poner await porque se puede ir haciendo asincronamente
            return next();
        } catch (error) {
            console.error('Error al subir al archivo:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        
    }

    
}

export const  uploadFileToFtpPruebas  = async (req: Request, res: Response) => {
    
    const file: any = req.file;
    if (!file) {
        return res.status(400).json({ error: 'Imagen no encontrado' });
        
    }else{
        console.log(file)
        const localPath = file.path;
        const remotePath =`./${file.filename}`;

        try {
            await uploadFile(localPath, remotePath); //creo que no hay que poner await porque se puede ir haciendo asincronamente
            return res.status(200).json({ message: 'Imagen subida correctamente' });
        } catch (error) {
            console.error('Error al subir al archivo:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        
    }

    
}