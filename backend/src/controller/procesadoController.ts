import { Request, Response } from 'express';
import { ChatMessage } from '../interfaces/procesadoInterfaces';
import * as fs from 'fs';
import openai from '../config/openAi';
import { elementosService } from '../services/elementoService';
import { procesadoService } from '../services/procesadoService';
import { parseBool } from '../utils/funcionesCompartidasController';
import { imagenService } from '../services/imagenService';
import { prompts } from '@prisma/client';
import { promptService } from '../services/promptService';
import { procesados_imagenes } from '@prisma/client';



// Constantes y configuracion de procesado
const IA_utilizada = 'openai';
const max_tokens = 500;
const temperature = 0;
const id_prompt_carteles: number = 4; //prompt usado actualmente para carteles
const id_prompt_dispositivos: number = 5; //prompt usado actualmente para dispositivos

export async function procesarImagenes(req: Request, res: Response) {
  try {
    const file = req.file //as { [fieldname: string]: Express.Multer.File[] };
    const id_elemento: number = parseInt(req.body.id_elemento); //ojo refactor
    const id_auditoria: number = parseInt(req.body.id_auditoria);
    console.log('id_auditoria: ',id_auditoria)
    
    //obtengo la imagen a procesar
    const imagenProcesada = file//(files['imagenesprocesado'] as Express.Multer.File[]).map(file => file.path)[0];

    if (!imagenProcesada ||!imagenProcesada.path || !imagenProcesada.filename) {
      
       res.status(500).json({ error: 'La imagen procesada no existe' });
       return;
    }
    
    //creo la imagen nueva y compruebo que existe el expositor (falta tipar)
    const [nuevaImagen, existingElemento, id_expositor_auditoria]  = await Promise.all([
      imagenService.create(imagenProcesada.filename, imagenProcesada.originalname),
      elementosService.getById(id_elemento),
      procesadoService.getIdExpositorAuditoria(id_elemento, id_auditoria)
    ]);    

    if (!existingElemento || !id_expositor_auditoria) {
        res.status(404).json({ error: 'Expositor no encontrado' });
        return;
    }
    

    //obtengo la imagen de referencia
    if (!existingElemento.id_imagen) {
      res.status(500).json({ error: 'La imagen de referencia no existe' }); //es un dispositivo, no se puede procesar
    }
    const imagenReferencia = await elementosService.getImage(existingElemento.id_imagen!);       
    

    if (!imagenReferencia) {
      res.status(500).json({ error: 'La imagen referencia no existe' });
      return;
    }
   
    //CORREGIR 
    const dispositivos_esperados: number = 0 //existingExpositor.numero_dispositivos || 0;
    const categoria = existingElemento.id_categoria || 1; //Corregir
    const id_prompt_usado: number = categoria == 1?  id_prompt_carteles : id_prompt_dispositivos;

    const promptObject: prompts | null = await promptService.getById(id_prompt_usado);
    if (!promptObject) {
      res.status(500).json({ error: 'Prompt no encontrado' });
      return;
    }

    //añadir num dispositivos al prompt (por añadir)

    //llamada a OpenAI
    const filePaths = [imagenReferencia.url, imagenProcesada.path];
    const openAiResult = await getOpenAiResults(filePaths, promptObject.texto_prompt!);
    if (!openAiResult) {
      res.status(500).json({ error: 'Error al procesar imágenes' });
      return;
    }
    //Comprobación de la válidez de la respuesta (falta por implementar)
    const cleanedResponse = openAiResult.replace(/[\n\r]/g, '');
    if (!isValidOpenAiResponse(cleanedResponse, promptObject.id_categoria!)) {
      res.status(500).json({ error: 'Respuesta inválida' });
      return;
    }

    

    const similarityObject = JSON.parse(cleanedResponse);

    const id_probabilidad_cartel: number | null = await procesadoService.getIdProbabilidadCartelDadaProbabilidad(similarityObject.probab_estar_contenido)
    if(!id_probabilidad_cartel) {
      throw new Error('Probabilidad cartel no valida')
    }

    //Guardar en la base de datos (falta por implementar)
    const id_procesado_imagen = await procesadoService.create( //devuelve el id del procesado de imagen para usarlo en el almacenamiento de la respuesta
      id_expositor_auditoria, 
      nuevaImagen.id,       
      id_auditoria,
      categoria,
      similarityObject.comentarios, 
      parseBool(similarityObject.valido), 
      IA_utilizada, 
      promptObject.id,
      id_probabilidad_cartel,
      parseInt(similarityObject.dispositivos_contados),
      dispositivos_esperados
      );    
    
    const procesado_object = await procesadoService.getById(id_procesado_imagen);
    console.log(procesado_object);
    return res.status(200).json(procesado_object);
    
  } catch (error) {
    console.error('Error al procesar imágenes:', error);
    res.status(500).json({ error: error });
    throw error;
  }
}

export async function borrarprocesado(req: Request, res: Response){
  try{
    const id_procesado: number = parseInt(req.params.id_procesado);
    await procesadoService.borrarProcesado(id_procesado);
    await procesadoService.borrarProcesado(id_procesado);
    console.log('Eliminado: ', id_procesado);
    return res.status(200).json({mensaje: 'Eliminado'})
  }catch(error){

    res.status(500).json({ error: error });
    throw error;
  }
}


async function getOpenAiResults(filePaths: string[], instrucciones: string) {
  console.log("procesando imagenes");

  // Codificar todas las imágenes en base64
  const base64Images = await Promise.all(filePaths.map(filePath => encodeImage(filePath)));

  // Crear el mensaje inicial con las instrucciones como un mensaje de texto
  const initialMessage: ChatMessage[] = [{
      type: "text",
      text: instrucciones,
  }];

  // Agregar cada imagen codificada como un mensaje de imagen
  const imageMessages: ChatMessage[] = base64Images.map(base64Image => ({
      type: "image_url",
      image_url: { "url": `data:image/jpg;base64,${base64Image}` },
  }));

  // Combinar las instrucciones con las imágenes
  const messages: any = initialMessage.concat(imageMessages);

  // Hacer la solicitud a la API de OpenAI
  try {
      const response = await openai.chat.completions.create({
          model: "gpt-4-vision-preview",
          max_tokens: max_tokens,
          temperature: temperature,
          messages: [
            {
            role:"user",
            content: [...messages,],
            },
          ],
      });

      console.log(response.choices[0]);
      return response.choices[0].message.content;
  } catch (error) {
      console.error('Error al obtener resultados de OpenAI:', error);
      throw error; // O manejar el error como prefieras
  }
}

async function encodeImage(filePath: string) {
  return fs.promises.readFile(filePath, 'base64');
}

function isValidOpenAiResponse  (response: string, tipoProcesado: number): boolean {
  try {
    const responseObject = JSON.parse(response);
    
    if (tipoProcesado === 1) {
      console.log(responseObject);
      return true;
      
    
    } else if (tipoProcesado === 2) {
      console.log(responseObject);
      return true;
    } 

    return false;
  } catch (error) {
    console.error('Error, no es un formato JSON:', error);
    return false; 
  }
}

  export async function borrarProcesado(req: Request, res: Response) {
    try{
      const id_procesado_imagen: number = parseInt(req.params.id_procesado_imagen);
      await procesadoService.borrarProcesado(id_procesado_imagen);
      res.status(200).json({ message: 'Borrado exitoso' });
      console.log('Procesado borrado: ', id_procesado_imagen);
    }catch(error){
        console.error('Error al borrar procesado:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

export async function feedbackProcesado(req: Request, res: Response) {
  
  try{

    const id_procesado_imagen = parseInt(req.body.id_procesado_imagen);  

      const feedback = req.body.feedback;
      console.log('id_procesado_imagen: ', id_procesado_imagen);
      console.log('feedback: ', feedback);
      await procesadoService.feedbackProcesado(id_procesado_imagen, feedback);
      res.status(200).json({ message: 'feedback insertado' });

  }catch(error){
      console.error('Error al editar el feedback del procesado:', error);
      res.status(500).json({ error: 'error feedback' });
  }


  }
  

  export async function getProcesadosByIdExpositor(req: Request, res: Response) {
    try{
      
    const id_expositor: number = parseInt(req.params.id_expositor);
    const procesados: procesados_imagenes[] = await procesadoService.getProcesadosByIdExpositor(id_expositor);
    res.status(200).json({ procesados });

    }catch(error){
      console.error('Error al obtener procesados:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

}


  export async function getProcesadosByIdAuditoria(req: Request, res: Response) {

    try{
      const id_auditoria: number = parseInt(req.params.id_auditoria);
      const procesados: procesados_imagenes[] = await procesadoService.getProcesadosByIdAuditoria(id_auditoria);
      res.status(200).json({ procesados });
           
    }catch{
    }

    
  }