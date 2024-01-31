import { Request, Response } from 'express';
import { promptService } from '../services/promptService';
import { prompts } from '@prisma/client';

export async function getAllPrompts( req: Request, res: Response) {
    try{
        req; //revisar
        const prompts: prompts[] = await promptService.getAll();
        res.status(200).json(prompts);
    }
    catch (error) {
        console.error('Error al obtener prompts:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}