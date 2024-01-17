import { Request, Response } from 'express';
import { ChatMessage } from '../interfaces/procesamientoInterfaces';
import * as fs from 'fs';
import openai from '../config/openAi';
import { imagenes, expositorios } from '@prisma/client';
import { expositorioService } from '../services/expositorioService';


const max_tokens = 500;
const temperature = 0;

export async function procesarImagenes(req: Request, res: Response) {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const expositorios: expositorios = req.body;

   
    //obtengo la imagen a procesar
    const imagenProcesadaPath = (files['imagenesProcesamiento'] as Express.Multer.File[]).map(file => file.path)[0];
    if (!imagenProcesadaPath) {
      
       res.status(500).json({ error: 'La imagen procesada no existe' });
       return;
    }

    //obtengo la imagen de referencia
    const imagenReferencia:imagenes = await expositorioService.getImage(expositorios.id_imagen);
    if (!imagenReferencia) {
      res.status(500).json({ error: 'La imagen referencia no existe' });
      return;
    }
    //llamada a OpenAI
    const filePaths = [imagenReferencia.url, imagenProcesadaPath];
    const openAiResult = await getOpenAiResults(filePaths, 'prompt_ejemplo');
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