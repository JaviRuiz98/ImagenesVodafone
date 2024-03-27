import { elementoExtended } from "../elementos/elementoExtended";
import { muebles } from "@prisma/client";

export interface muebleConElementos extends muebles {
    elementos: elementoExtended[];
}