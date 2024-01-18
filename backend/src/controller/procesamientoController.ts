import { Request, Response } from 'express';
import { ChatMessage } from '../interfaces/procesamientoInterfaces';
import * as fs from 'fs';
import openai from '../config/openAi';
import { imagenes } from '@prisma/client';
import { expositorioService } from '../services/expositorioService';
import { expositorioProcesado } from '../interfaces/expositorioImagenesProcesadas';

const max_tokens = 500;
const temperature = 0;

export async function procesarImagenes(req: Request, res: Response) {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const expositorios: expositorioProcesado[] = req.body;

    const procesarExpositorio = async (expositorio: expositorioProcesado) => {
      try {
        //obtengo la imagen a procesar
        const imagenProcesada = files['imagenProcesada'].find(imagen => imagen.originalname === expositorio.imagen_procesada.url);
        if (!imagenProcesada) {
          return { error: 'La imagen procesada no existe' };
        }
        //obtengo la imagen de referencia
        const imagenReferencia:imagenes = await expositorioService.getImage(expositorio.id_imagen);
        if (!imagenReferencia) {
          return { error: 'La imagen referencia no existe' };
        }
        //llamada a OpenAI
        const filePaths = [imagenReferencia.url, imagenProcesada.path];
        const openAiResult = await getOpenAiResults(filePaths, 'prompt_ejemplo');
        if (!openAiResult) {
          return { error: 'Error en el procesamiento de imágenes' };
        }
        //Comprobación de la válidez de la respuesta (falta por implementar)
        const cleanedResponse = openAiResult.replace(/[\n\r]/g, '');
        if (!isValidOpenAiResponse(cleanedResponse)) {
          return { error: 'Error de formato en la respuesta de OpenAI' };
        }

        const similarityObject = JSON.parse(cleanedResponse);
        //Guardar en la base de datos (falta por implementar)
        
        return similarityObject;

      } catch (error: any) {
        console.error('Error procesando expositorio:', error);
        return { error: error.message };
      }
    };

    const promesasExpositorios = expositorios.map(expositorio => procesarExpositorio(expositorio));
    const resultados = await Promise.allSettled(promesasExpositorios);
    const expositoriosProcesados = resultados.map(resultado => resultado.status === 'fulfilled' ? resultado.value : { error: 'Error procesando expositorio' });

    res.status(200).json(expositoriosProcesados);
  } catch (error) {
    console.error('Error al procesar imágenes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
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