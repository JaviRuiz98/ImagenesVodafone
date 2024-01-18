import multer from 'multer';
import path from 'path';

// Función para crear la configuración de almacenamiento
//usar sfid para el nombre del archivo
const createStorageConfig = (folderPath: string) => {
  return multer.diskStorage({
    destination: getDestination(folderPath),
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileName = `${uniqueSuffix}${path.extname(file.originalname)}`;
      cb(null, fileName);
    },
  });
};

function getDestination(folderPath: string): string {
 return  path.join(__dirname, '..', '..', 'assets', 'imagenes', folderPath);
}
// Crear configuraciones de almacenamiento específicas
const storageImagenReferencia = createStorageConfig('imagenesReferencia');
const storageImagenProcesada = createStorageConfig('imagenesProcesamiento');

// Middleware de Multer


const uploadImagenRepresentativa = multer({ storage: storageImagenReferencia }).array('imagenesReferencia');
const uploadImagenProcesada = multer({ storage: storageImagenProcesada }).array('imagenesProcesamiento');

// Exportar los middleware
export { uploadImagenRepresentativa, uploadImagenProcesada, getDestination };
