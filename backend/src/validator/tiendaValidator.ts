import { Request, Response, NextFunction } from 'express';

function isNumber(paramValue:string) {
    return typeof paramValue === 'number' && !isNaN(paramValue);
  }

export async function validateGetTiendasBySfid(req:Request, res:Response, next:NextFunction) {
    const sfid = req.params.sfid;
    if (!sfid || !isNumber(sfid)) {
        res.status(400).json({ error: 'Sfid is required' });
    }
    next();
}

