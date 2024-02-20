import { elementoExtended } from "./elementoExtended";
import { muebles } from "@prisma/client";

export interface muebleConElementos extends muebles {
    elementos: elementoExtended[];
}