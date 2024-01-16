import multer from 'multer';
import path from 'path';

// Función para crear la configuración de almacenamiento
const createStorageConfig = (folderPath: string) => {
  return multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'assets', 'images', folderPath),
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileName = `${uniqueSuffix}${path.extname(file.originalname)}`;
      cb(null, fileName);
    },
  });
};

// Crear configuraciones de almacenamiento específicas
const storageImagenRepresentativa = createStorageConfig('imagen_representativa');
const storageImagenProcesada = createStorageConfig('imagen_procesamiento');

// Middleware de Multer


const uploadImagenRepresentativa = multer({ storage: storageImagenRepresentativa }).array('imagenRepresentativa');
const uploadImagenProcesada = multer({ storage: storageImagenProcesada }).array('imagenProcesada');

// Exportar los middleware
export { uploadImagenRepresentativa, uploadImagenProcesada };
