import db  from "../config/database";
import {  imagenes } from '@prisma/client';

export const imagenService = {
    async create (url:string) : Promise<imagenes>{
        try{
            return db.imagenes.create({
                data: {
                    url: url
                }  
        });
        } catch(error){

            throw error;

        }finally{

        }
        
    }, 

}