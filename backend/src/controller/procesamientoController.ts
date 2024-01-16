import { Request, Response } from 'express';
import { ChatMessage } from '../interfaces/procesamientoInterfaces';
import * as fs from 'fs';
import openai from '../config/openAi';
import { imagenes } from '@prisma/client';
import { expositorioService } from '../services/expositorioService';

const max_tokens = 500;
const temperature = 0;

export async function procesarImagenes(req: Request, res: Response) {  

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const {expositorio} = req.body; //falta tipo

      // Access the filenames and filepaths of the uploaded images
    const filenames = (files['imagenProcesada'] as Express.Multer.File[]).map(file => file.filename);
    const filepaths = (files['imagenProcesada'] as Express.Multer.File[]).map(file => file.path);

    const imagenesExpositorios: imagenes[] = await expositorioService.getImages(expositorio.id_expositorio);

    const ExpositoriosfilePaths = imagenesExpositorios.map(imagen => imagen.url);

    
  

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