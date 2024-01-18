import { Request, Response } from 'express';
import { ChatMessage } from '../interfaces/procesamientoInterfaces';
import * as fs from 'fs';
import openai from '../config/openAi';
import { expositores } from '@prisma/client';
import { expositoresService } from '../services/expositorService';
import { getPromptMoviles, getPromptCarteles } from '../config/prompts';

// Constantes y configuracion de procesado
const max_tokens = 500;
const temperature = 0;
const promptCarteles = getPromptCarteles('prompt_carteles_r1');
const nombrePromptMoviles = 'a'

export async function procesarImagenes(req: Request, res: Response) {
  try {
    const file = req.file //as { [fieldname: string]: Express.Multer.File[] };
    const idExpositor: number = parseInt(req.body.idExpositor);
    
   
    //obtengo la imagen a procesar
    const imagenProcesadaPath = file?.path//(files['imagenesProcesamiento'] as Express.Multer.File[]).map(file => file.path)[0];
    if (!imagenProcesadaPath) {
      
       res.status(500).json({ error: 'La imagen procesada no existe' });
       return;
    }

    const existingExpositorio: expositores | null = await expositoresService.getById(idExpositor);

    if (!existingExpositorio) {
        res.status(404).json({ error: 'Expositorio not found' });
        return;
    }


    //obtengo la imagen de referencia y la cantidad de dispositivos 
    const [imagenReferencia, dispositivosCount] = await Promise.all([
      expositoresService.getImage(existingExpositorio.id_imagen),
      expositoresService.getDispositivosCount(existingExpositorio.id_expositor)
    ]);


    if (!imagenReferencia) {
      res.status(500).json({ error: 'La imagen referencia no existe' });
      return;
    }
   
    const prompt: string = dispositivosCount ===0 ? promptCarteles : getPromptMoviles(nombrePromptMoviles, dispositivosCount);


    //llamada a OpenAI
    const filePaths = [imagenReferencia.url, imagenProcesadaPath];
    const openAiResult = await getOpenAiResults(filePaths, prompt);
    if (!openAiResult) {
      res.status(500).json({ error: 'Error al procesar imágenes' });
      return;
    }
    //Comprobación de la válidez de la respuesta (falta por implementar)
    const cleanedResponse = openAiResult.replace(/[\n\r]/g, '');
    if (!isValidOpenAiResponse(cleanedResponse)) {
      res.status(500).json({ error: 'Respuesta inválida' });
      return;
    }

    const similarityObject = JSON.parse(cleanedResponse);
    //Guardar en la base de datos (falta por implementar)
    

    return res.status(200).json(similarityObject);
  } catch (error) {
    console.error('Error al procesar imágenes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
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

  function isValidOpenAiResponse  (_response: string): boolean {
    return true;
  }