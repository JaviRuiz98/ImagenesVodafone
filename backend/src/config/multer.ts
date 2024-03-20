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
  return 'http://validador-vf.topdigital.local/imagenes/'+ folderPath + '/'
}
// Crear configuraciones de almacenamiento específicas
const storageImagenReferencia = createStorageConfig('imagenesReferencia');
const storageImagenProcesada = createStorageConfig('imagenesProcesamiento');
const storageImagenProducto = createStorageConfig('imagenesProducto');
const storagePlanoImagen = createStorageConfig('imagenesPlanos');
// Middleware de Multer


const uploadImagenRepresentativa = multer({ storage: storageImagenReferencia }).single('imagenesReferencia');
const uploadArrayImagenRepresentativa = multer({ storage: storageImagenReferencia }).array('imagenesReferencia');
const uploadImagenProcesada = multer({ storage: storageImagenProcesada }).single('imagenesProcesamiento');
const uploadImagenProducto = multer({ storage: storageImagenProducto }).single('imagenesProducto'); //almacenamiento para los productos de uniforme
const uploadPlanoImagen = multer({ storage: storagePlanoImagen }).single('imagenesPlanos');
const uploadNone = multer().none();

// Exportar los middleware
export { uploadImagenRepresentativa, uploadArrayImagenRepresentativa, uploadImagenProcesada,uploadImagenProducto,uploadNone, uploadPlanoImagen ,getDestination };

