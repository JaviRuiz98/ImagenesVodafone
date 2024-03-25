import { procesados_imagenes } from "@prisma/client";
import { resultados_ordenados } from "../interfaces/resultados_ordenados";

export function parseBool(value: string): boolean {
    const value_bool = value == 'true';
    return value_bool;
  }
  
                                                                                                      //por defecto 10, no creo que haya mas
  export  function getResumenEstadisticas( procesados: procesados_imagenes[], maximaDiferenciaPermitida:number = 10 ):resultados_ordenados {
    
      // Inicializar el objeto de resultados ordenados
      const resultados: resultados_ordenados = {
        carteles: {
          muy_alta: 0,
          alta: 0,
          media: 0,
          baja: 0,
          muy_baja: 0,
          ninguna: 0,
          otro_idioma: 0,
        },
        conteo_dispositivos: {
          // Inicializar el array de errores de dispositivos con ceros
          diferencia: new Array(maximaDiferenciaPermitida +1).fill(0), 
          error: 0,
          
        },
      };
  
   
      
      // Procesar cada registro para contar las probabilidades y los errores de dispositivo
      for (const item of procesados) {
        if (!!item.id_probabilidad_cartel){
          // Contar las probabilidades de carteles
          switch (item.id_probabilidad_cartel) {
            case 1:
              resultados.carteles.muy_alta++;
              break;
            case 2:
              resultados.carteles.alta++;
              break;
            case 3:
              resultados.carteles.otro_idioma++;
              break;
            case 4:
              resultados.carteles.media++;
              break;
            case 5:
              resultados.carteles.baja++;
              break;
            case 6:
              resultados.carteles.muy_baja++;
              break;
            case 7:
              resultados.carteles.ninguna++;
              break;
          }
        }
        
  
       // Calcular el error de dispositivos contados vs. huecos esperados
      if (!!item.dispositivos_contados  && !!item.huecos_esperados ) {
        if (item.dispositivos_contados == 0){
          resultados.conteo_dispositivos.error++;
        }else{
          const diferencia = Math.abs(item.dispositivos_contados - item.huecos_esperados);
          if (diferencia >= resultados.conteo_dispositivos.diferencia.length) {
            //Si fuese mas de numErrorConteo, se añaden en la posición numErrorConteo, por defecto sería la posición 11
            resultados.conteo_dispositivos.diferencia[maximaDiferenciaPermitida] += 1;
          } else {
            resultados.conteo_dispositivos.diferencia[diferencia]++;
          }
        }
       
      }
    }

    // Retornar los resultados ordenados
    return resultados;
  
  }
  