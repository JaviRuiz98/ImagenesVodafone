
import { NextFunction, Request, Response } from 'express';
import PromiseFtp from 'promise-ftp';


const ftp = new PromiseFtp();
// Subir un archivo a ftp, no sirve para array de multer
const uploadSingleFileToFtp = (folderName: string) => async (req: Request, res: Response, next: NextFunction) => {
 
  try {
    const file = req.file;
    if (!file){
      return next();
    }
    
    const filename = file.filename;


    ftp.connect({
      host: process.env.HOST_FTP,
      user: process.env.USER_FTP,
      password: process.env.PASSWORD_FTP,
      port: 21,
    })
    .then(() => {
      console.log('Connected to ftp server');
      return ftp.put(file.path, `imagenes/${folderName}/${filename}`);
    })
    .then(() => {
      console.log('File uploaded successfully');
      ftp.end();
      next(); // Move to the next middleware after successful upload
    })
    .catch((error) => {
      console.error('Error in FTP operation:', error);
      ftp.end();
      return res.status(500).json({ error: 'Error in FTP operation' }); // Send an error response

    });


  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });

  }
    
    // fs.unlinkSync(file.path); // Opcional elimina el arhivo
  
};


export {  uploadSingleFileToFtp };
