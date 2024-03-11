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


const uploadImagenRepresentativa = multer({ storage: storageImagenReferencia }).single('imagenesReferencia');
const uploadArrayImagenRepresentativa = multer({ storage: storageImagenReferencia }).array('imagenesReferencia');
const uploadImagenProcesada = multer({ storage: storageImagenProcesada }).single('imagenesProcesamiento');
const uploadNone = multer().none();

// Exportar los middleware
export { uploadImagenRepresentativa, uploadArrayImagenRepresentativa, uploadImagenProcesada,uploadNone, getDestination };



// import multer from 'multer';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid'; // Importando UUID para generar identificadores únicos

// // Configuración centralizada de la ruta base de las imágenes
// const IMAGES_BASE_PATH = '../../assets/imagenes';

// // Función para crear la configuración de almacenamiento
// const createStorageConfig = (folderName: string) => {
//   const storage = multer.diskStorage({
//     destination: (_req, _file, cb) => {
//       // Construyendo la ruta del directorio de destino usando la configuración centralizada
//       const destinationPath = path.join(__dirname, IMAGES_BASE_PATH, folderName);
//       cb(null, destinationPath);
//     },
//     filename: (_req, file, cb) => {
//       // Generando un nombre de archivo único usando UUID
//       const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
//       const fileName = `${uniqueSuffix}${path.extname(file.originalname)}`;
//       cb(null, fileName);
//     },
//   });
//   return storage;
// };

// // Crear configuraciones de almacenamiento específicas
// const storageImagenReferencia = createStorageConfig('imagenesReferencia');
// const storageImagenProcesada = createStorageConfig('imagenesProcesamiento');

// // Middleware de Multer para subir imágenes
// const uploadImagenReferencia = multer({ storage: storageImagenReferencia }).single('imagenReferencia');
// const uploadImagenProcesada = multer({ storage: storageImagenProcesada }).single('imagenProcesada');

// // Exportar los middleware
// export { uploadImagenReferencia, uploadImagenProcesada };