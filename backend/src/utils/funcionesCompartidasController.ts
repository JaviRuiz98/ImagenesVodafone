import {  elementos, procesados_imagenes } from "@prisma/client";
import { resultados_ordenados, resultados_ordenados_elementos } from "../interfaces/resultados_ordenados";
import { cuenta_no_procesados } from "../interfaces/cuenta_no_procesados";
import { elementosConProcesados } from "../interfaces/expositoresProcesados";

export function parseBool(value: string): boolean {
    const value_bool = value == 'true';
    return value_bool;
  }

//por defecto 10, no creo que haya mas
export  function getResumenEstadisticas( procesados: procesados_imagenes[], maximaDiferenciaPermitida:number = 10, cuenta_no_procesados?: cuenta_no_procesados ):resultados_ordenados {
  // Inicializar el objeto de resultados ordenados
  const resultados: resultados_ordenados = {
    carteles: {
      muy_alta: 0,
      alta: 0,
      otro_idioma: 0,
      media: 0,
      baja: 0,
      muy_baja: 0,
      ninguna: 0,
      no_procesados: cuenta_no_procesados?.no_procesados_carteles
    },
    conteo_dispositivos: {
      // Inicializar el array de errores de dispositivos con ceros
      diferencia: new Array(maximaDiferenciaPermitida+1).fill(0), 
      error: 0,
      no_procesados: cuenta_no_procesados?.no_procesados_dispositivos
    },
  };


  
  // Procesar cada registro para contar las probabilidades y los errores de dispositivo
  for (const item of procesados) {
    if(!!item) {
      if(item.valido == false) {
        resultados.conteo_dispositivos.error++;
      } else{

        if (!!item.id_probabilidad_cartel){
          addResultadoByIdProbabilidadCartel(resultados, item.id_probabilidad_cartel, 1);
        }
        
  
        // Calcular el error de dispositivos contados vs. huecos esperados
        if (!!item.dispositivos_contados  && !!item.huecos_esperados ) {
          const diferencia = Math.abs(item.dispositivos_contados - item.huecos_esperados);
          if (diferencia >= resultados.conteo_dispositivos.diferencia.length) {
            //Si fuese mas de numErrorConteo, se añaden en la posición numErrorConteo, por defecto sería la posición 11
            resultados.conteo_dispositivos.diferencia[maximaDiferenciaPermitida] ++;
          } else {
            resultados.conteo_dispositivos.diferencia[diferencia]++;
          }
        }
      }
    }
  }
  // Retornar los resultados ordenados
  return resultados;
}

function addResultadoByIdProbabilidadCartel(resultados: resultados_ordenados, id_probabilidad_cartel: number, incremento: number ) {
  switch (id_probabilidad_cartel) {
    case 1:
      resultados.carteles.muy_alta += incremento;
      break;
    case 2:
      resultados.carteles.alta += incremento;
      break;
    case 3:
      resultados.carteles.otro_idioma += incremento;
      break;
    case 4:
      resultados.carteles.media += incremento;
      break;
    case 5:
      resultados.carteles.baja += incremento;
      break;
    case 6:
      resultados.carteles.muy_baja += incremento;
      break;
    case 7:
      resultados.carteles.ninguna += incremento;
      break;
  }
}

function addElementoInResultadoByIdProbabilidadCartel(resultados: resultados_ordenados_elementos, id_probabilidad_cartel: number, elemento: elementos ) {
  switch (id_probabilidad_cartel) {
    case 1:
      resultados.carteles.muy_alta.push( elemento);
      break;
    case 2:
      resultados.carteles.alta.push( elemento);
      break;
    case 3:
      resultados.carteles.otro_idioma.push( elemento);
      break;
    case 4:
      resultados.carteles.media.push( elemento);
      break;
    case 5:
      resultados.carteles.baja.push( elemento);
      break;
    case 6:
      resultados.carteles.muy_baja.push( elemento);
      break;
    case 7:
      resultados.carteles.ninguna.push( elemento);
      break;
  }
}

  export  function getResumenEstadisticasConElementos( elementos: elementosConProcesados[], maximaDiferenciaPermitida:number = 10 ):resultados_ordenados_elementos {
    
    // Inicializar el objeto de resultados ordenados
    const resultados: resultados_ordenados_elementos = {
      carteles: {
        muy_alta: [],
        alta: [],
        media: [],
        baja: [],
        muy_baja: [],
        ninguna: [],
        otro_idioma: [],
      },
      conteo_dispositivos: {
        // Inicializar el array de errores de dispositivos con ceros
        diferencia: [], 
        error: [],
        
      },
    };
    //inicializar diferencia
    for (let i = 0; i <= maximaDiferenciaPermitida; i++) {
      resultados.conteo_dispositivos.diferencia[i] = [];
  }


    // Procesar cada registro para contar las probabilidades y los errores de dispositivo
    for (const elemento of elementos) {
      if (elemento.id_categoria == 3){ //modelos
       //Necesito obtener  Math.abs(item.dispositivos_contados - item.huecos_esperados); más común de todos los procesados
        if (elemento.procesados_imagenes != null && elemento.procesados_imagenes.length > 0){
          const diferencia:number = getDiferenciaMasComun(elemento.procesados_imagenes);
          if (diferencia == -1){
            resultados.conteo_dispositivos.error.push(elemento);
          } else {
            if (diferencia >= resultados.conteo_dispositivos.diferencia.length) {
              //Si fuese mas de numErrorConteo, se añaden en la posición numErrorConteo, por defecto sería la velocidad 11
              resultados.conteo_dispositivos.diferencia[maximaDiferenciaPermitida].push(elemento);
            } else {
              resultados.conteo_dispositivos.diferencia[diferencia].push(elemento);
            }
          }
        }

      } else if (elemento.id_categoria == 1){ //carteles
        if (elemento.procesados_imagenes != null){
          const probabilidad_cartel:number = getProbabilidadCartelMasComun(elemento.procesados_imagenes);
          addElementoInResultadoByIdProbabilidadCartel(resultados, probabilidad_cartel, elemento);
        }
      }else {
        //not supported
      }
    }
     
  // Retornar los resultados ordenados
  return resultados;

}

function getProbabilidadCartelMasComun(procesados_imagenes: procesados_imagenes[]): number {
  const probabilidades: { id: number, count: number }[] = getNumeroProbabilidad(procesados_imagenes);
   

  probabilidades.sort((a, b) => {
    if (a.count === b.count) {
      return  b.id - a.id; // En caso de empate, el de mayor ID primero (menor probabilidad)
    }
    return b.count - a.count; // El de mayor número de ocurrencias primero
  });

  return probabilidades[0].id;

}

//Muy grande gepeto
function getDiferenciaMasComun(procesados_imagenes: procesados_imagenes[]): number {
  const diferenciasCount: { [key: number]: number } = {};

  procesados_imagenes.forEach((procesado: procesados_imagenes) => {
    if (procesado.dispositivos_contados == null || procesado.huecos_esperados == null) {
      return;
    }

    if (!procesado.valido) {//si es error con key en -1 añadimos uno mas
      diferenciasCount[-1] = (diferenciasCount[-1] || 0) + 1;
      return;
    }
    //en caso de que existan dispositivos contados y huecos esperados calculamos la diferencia
    const diferencia = Math.abs(procesado.dispositivos_contados - procesado.huecos_esperados);
    //lo sumamos a la key correspondiente
    if (diferenciasCount[diferencia] === undefined) {
      diferenciasCount[diferencia] = 1;
    } else {
      diferenciasCount[diferencia]++;
    }
  });

  //salimos del bucle y creamos un array de [clave, valor]
  let diferenciasArray: [number, number][] = Object.entries(diferenciasCount).map(([key, value]) => [parseInt(key), value]);

  //vamos a devolver el mas común
  diferenciasArray.sort((a, b) => {
    if (b[1] === a[1]) { //comparamos valores porque b[0] y a[0] son las claves (diferencias)
      return b[0] - a[0]; //Me quedo con la mayor diferencia de valor
    }
    return b[1] - a[1];
  });

  /*De la forma en la que lo ordenado me qudaré con la mayor clave, por tanto estará en la posición 0 del array */
  //Me quedaré con la clave (diferencia) para devolver:

  const diferenciaMasComun: number =  diferenciasArray.length > 0 ? diferenciasArray[0][0] : -1; //Nunca debería dar -1 aquí solo se envían arrays de procesados de elementos de categoría 3

  /* 
  Ahora bien tengo que tener en cuenta que en la forma que lo he ordenado si hay un parte entre dos claves y la segunda clave es -1, 
  siempre estará en la segunda posición y debería tener prioridad sobre los otros indices aunque sea mas pequeño, porque se trata de un error.
  */
  if (diferenciasArray.length > 1 && diferenciasArray[1][0] === -1 && (diferenciasArray[1][1] >= diferenciasArray[0][1])) {
    return -1;
  }
  return diferenciaMasComun;
}
  

function getNumeroProbabilidad(procesados_imagenes: procesados_imagenes[]): { id: number, count: number }[] {
  let probabilidades = [
    { id: 1, count: 0 },
    { id: 2, count: 0 },
    { id: 3, count: 0 },
    { id: 4, count: 0 },
    { id: 5, count: 0 },
    { id: 6, count: 0 },
    { id: 7, count: 0 }
  ];
  for (const procesado of procesados_imagenes) { 
    if (!!procesado.id_probabilidad_cartel ){
      probabilidades[procesado.id_probabilidad_cartel - 1].count++;
    }
    
  }

    return probabilidades;
  }



