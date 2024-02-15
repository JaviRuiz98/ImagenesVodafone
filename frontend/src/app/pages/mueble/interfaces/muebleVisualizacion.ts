import { Expositor } from "src/app/interfaces/expositor";
import { muebles } from "src/app/interfaces/muebles";

export interface mueblesVisualizacion extends muebles {
  expositores_carteles: Expositor[];
  expositores_dispositivos: Expositor[];
}
