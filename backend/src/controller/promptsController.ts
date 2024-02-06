import { Request, Response } from 'express';
import { promptService } from '../services/promptService';
import { prompts } from '@prisma/client';
import { estadisticaPrompts } from '../interfaces/estadisticaPrompts';

export async function getAllPrompts( _req: Request, res: Response) {
    try{      
        const prompts: prompts[] = await promptService.getAll();
        res.status(200).json(prompts);
    }
    catch (error) {
        console.error('Error al obtener prompts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function estadisticasPrompts(_req: Request, res: Response) {
    try{      
        
        const prompts_existentes: prompts[] = await promptService.getAll();
       
        let estadisticas_prompts: estadisticaPrompts[] = [];

        for(let i=0; i<prompts_existentes.length; i++){
            const feedbacks = await promptService.estadisticasPrompts( prompts_existentes[i].id_prompt );
            if((feedbacks.length > 0)){
                const estadistica: estadisticaPrompts = {
                    id_prompt: prompts_existentes[i].id_prompt,
                    nombre_prompt: prompts_existentes[i].nombre_prompt,
                    likes: feedbacks.filter((feedback) => feedback.feedback_humano === true).length,
                    dislikes: feedbacks.filter((feedback) => feedback.feedback_humano === false).length,
                    nulos: feedbacks.filter((feedback) => feedback.feedback_humano === null).length,
                    porcentaje_exito: (feedbacks.length > 0) ? (feedbacks.filter((feedback) => feedback.feedback_humano === true).length / (feedbacks.filter((feedback) => feedback.feedback_humano === true).length +  feedbacks.filter((feedback) => feedback.feedback_humano === false).length)) * 100 : 0
                }
                estadisticas_prompts.push(estadistica);
            }
        }
        res.status(200).json(estadisticas_prompts);
    }
    catch (error) {
        console.error('Error al obtener estadisticas:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
}