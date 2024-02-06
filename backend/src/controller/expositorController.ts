import { Request, Response } from 'express';


export async function createExpositor(_req: Request, res: Response) {
    try {
        
        
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}