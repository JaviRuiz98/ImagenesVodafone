import { Request, Response } from 'express';
import { ChatMessage } from '../interfaces/procesamientoInterfaces';
import * as fs from 'fs';
import openai from '../config/openAi';
import { expositoresService } from '../services/expositorService';
import { getPromptDispositivos, getPromptCarteles } from '../config/prompts';
import { procesamientoService, respuestaService } from '../services/procesamientoService';
import { promptObject } from '../interfaces/promptObject';
import { parseBool } from '../utils/funcionesCompartidasController';
import { imagenService } from '../services/imagenService';


// Constantes y configuracion de procesado
const IA_utilizada = 'openai';
const max_tokens = 500;
const temperature = 0;
const nombrePromptCarteles = 'prompt_carteles_r1';
const nombrePromptDispositivos = 'prompt_telefonosEsperados_2';

export async function procesarImagenes(req: Request, res: Response) {
  try {
    const file = req.file //as { [fieldname: string]: Express.Multer.File[] };
    const idExpositor: number = parseInt(req.body.idExpositor);
    
   
    //obtengo la imagen a procesar
    const imagenProcesada = file//(files['imagenesProcesamiento'] as Express.Multer.File[]).map(file => file.path)[0];

    if (!imagenProcesada ||!imagenProcesada.path || !imagenProcesada.filename) {
      
       res.status(500).json({ error: 'La imagen procesada no existe' });
       return;
    }
    
    //creo la imagen nueva y compruebo que existe el expositor (falta tipar)
    const [nuevaImagen, existingExpositor]  = await Promise.all([
      imagenService.create(imagenProcesada.filename),
      expositoresService.getById(idExpositor),
    ]);
 
    

    if (!existingExpositor) {
        res.status(404).json({ error: 'Expositorio not found' });
        return;
    }


    //obtengo la imagen de referencia y la cantidad de dispositivos 
    const [imagenReferencia, dispositivosCount] = await Promise.all([
      expositoresService.getImage(existingExpositor.id_imagen),
      expositoresService.getDispositivosCount(existingExpositor.id_expositor)
    ]);


    if (!imagenReferencia) {
      res.status(500).json({ error: 'La imagen referencia no existe' });
      return;
    }
   
    const tipoProcesado: 'carteles' | 'dispositivos' = getTipoProcesadoDeNumeroDispositivos(dispositivosCount);

    const promptObject: promptObject = getPromptObject(tipoProcesado, dispositivosCount, nombrePromptCarteles, nombrePromptDispositivos);

    //llamada a OpenAI
    const filePaths = [imagenReferencia.url, imagenProcesada.path];
    const openAiResult = await getOpenAiResults(filePaths, promptObject.prompt);
    if (!openAiResult) {
      res.status(500).json({ error: 'Error al procesar imágenes' });
      return;
    }
    //Comprobación de la válidez de la respuesta (falta por implementar)
    const cleanedResponse = openAiResult.replace(/[\n\r]/g, '');
    if (!isValidOpenAiResponse(cleanedResponse, tipoProcesado)) {
      res.status(500).json({ error: 'Respuesta inválida' });
      return;
    }

    const similarityObject = JSON.parse(cleanedResponse);
    //Guardar en la base de datos (falta por implementar)
    const id_procesado_imagen = await procesamientoService.create( //devuelve el id del procesado de imagen para usarlo en el almacenamiento de la respuesta
      nuevaImagen.id_imagen, 
      existingExpositor.id_expositor, 
      similarityObject.comentarios, 
      parseBool(similarityObject.valido), 
      IA_utilizada, 
      promptObject.nombre_prompt);
    
    //Almacenar los datos de las respuestas
    if (tipoProcesado === 'carteles') {
      respuestaService.createRespuestaCartel(id_procesado_imagen, similarityObject.probab_estar_contenido);
    } else if (tipoProcesado === 'dispositivos') {
      respuestaService.createRespuestaDispositivo(id_procesado_imagen, dispositivosCount, parseInt(similarityObject.dispositivos_contados));
    }

    return res.status(200).json(similarityObject);
  } catch (error) {
    console.error('Error al procesar imágenes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    throw error;
    
  }
}


function getTipoProcesadoDeNumeroDispositivos(dispositivosCount: number): 'carteles' | 'dispositivos' {
  if (dispositivosCount === 0) {
    return 'carteles';
  } else {
    return 'dispositivos';
  }
}


function getPromptObject(tipoProcesado: string, dispositivosCount: number, nombrePromptCarteles: string, nombrePromptDispositivos: string): promptObject {
  // Prompt object es un objeto que contiene el nombre del prompt y el prompt correspondiente

  const nombre_prompt: string = tipoProcesado === 'carteles' ? nombrePromptCarteles : nombrePromptDispositivos;
  const prompt : string = tipoProcesado === 'carteles' ? getPromptCarteles(nombrePromptCarteles) : getPromptDispositivos(nombrePromptDispositivos, dispositivosCount);

  const promptObject: promptObject = {
    nombre_prompt,
    prompt
  };

  return promptObject;
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

  function isValidOpenAiResponse  (response: string, tipoProcesado: string): boolean {
    try {
      const responseObject = JSON.parse(response);
      
      if (tipoProcesado === 'carteles') {
        console.log(responseObject);
        return true;
       
     
      } else if (tipoProcesado === 'dispositivos') {
        console.log(responseObject);
        return true;
      } 
  
      return false;
    } catch (error) {
      console.error('Error, no es un formato JSON:', error);
      return false; 
    }
  }