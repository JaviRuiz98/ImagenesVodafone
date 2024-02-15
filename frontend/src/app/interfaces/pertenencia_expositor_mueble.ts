// esta interfaz es necesaria para el historial de expositores de un mueble

import { Expositor } from "./expositor";
import { muebles } from "./muebles";

export interface pertenencia_expositor_mueble {
    id_pertenencia_expositor_mueble: number;
    fecha: Date;
    expositores: Expositor;
    muebles: muebles;

}