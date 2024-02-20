import { Request, Response } from 'express';


export async function informe(req: Request, _res: Response) {
    console.log(req.body)
}