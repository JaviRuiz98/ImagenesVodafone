import db  from "../config/database";
import {  imagenes } from '@prisma/client';

export const imagenService = {
    async create (url:string, nombre_archivo:string) : Promise<imagenes>{
        try{
            return db.imagenes.create({
                data: {
                    url: url,
                    nombre_archivo: nombre_archivo
                }  
        });
        } catch(error){

            throw error;

        }finally{

        }
        
    }, 

}