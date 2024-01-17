import { Request, Response, NextFunction } from 'express';



export async function validateGetTiendasBySfid(req:Request, res:Response, next:NextFunction) {
    const sfid = req.params.sfid;
    if (!sfid) {
        res.status(400).json({ error: 'Sfid is required' });
    }
    next();
}

