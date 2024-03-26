import { Injectable } from '@angular/core';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';
import { resultados_ordenados } from 'src/app/interfaces/resultados_ordenados';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasMethodsService {

constructor() { }

//valores para inicializar gráficas
estadisticas_estados_auditoria: datos_graficas[] = [
  {
    etiqueta: 'En proceso',
    valor: 0,
    color: 'yellow'
  },
  {
    etiqueta: 'Finalizada',
    valor: 0,
    color: 'green'
  },    
  {
    etiqueta: 'Caducada',
    valor: 0,
    color: 'red'
  }
];

estadisticas_resultados_carteles: datos_graficas[] = [
  {
    etiqueta: 'Muy alta',
    valor: 0,
    color: 'green'
  },
  {
    etiqueta: 'Alta',
    valor: 0,
    color: 'yellow'
  },
  {
    etiqueta: 'Otro idioma',
    valor: 0,
    color: 'blue'
  },
  {
    etiqueta: 'Media',
    valor: 0,
    color: 'orange'
  },
  {
    etiqueta: 'Baja',
    valor: 0,
    color: 'orange'
  },
  {
    etiqueta: 'Muy baja',
    valor: 0,
    color: 'red'
  },
  {
    etiqueta: 'Ninguna',
    valor: 0,
    color: 'red'
  },
  {
    etiqueta: 'No procesado',
    valor: 0,
    color: 'bluegray'
  }
];
estadisticas_resultados_carteles_sin_no_procesados: datos_graficas[] = [
  {
    etiqueta: 'Muy alta',
    valor: 0,
    color: 'green'
  },
  {
    etiqueta: 'Alta',
    valor: 0,
    color: 'yellow'
  },
  {
    etiqueta: 'Otro idioma',
    valor: 0,
    color: 'blue'
  },
  {
    etiqueta: 'Media',
    valor: 0,
    color: 'orange'
  },
  {
    etiqueta: 'Baja',
    valor: 0,
    color: 'orange'
  },
  {
    etiqueta: 'Muy baja',
    valor: 0,
    color: 'red'
  },
  {
    etiqueta: 'Ninguna',
    valor: 0,
    color: 'red'
  },
  
];

estadisticas_resultados_conteo: datos_graficas[] = [
  {
    etiqueta: 'Correcto',
    valor: 0,
    color: 'green'
  },
  {
    etiqueta: 'Diferencia de 1 o 2',
    valor: 0,
    color: 'yellow'
  },
  {
    etiqueta: 'Diferencia de 3 o 4',
    valor: 0,
    color: 'orange'
  },
  {
    etiqueta: 'Diferencia de 5 o más',
    valor: 0,
    color: 'red'
  },      
  {
    etiqueta: 'Error',
    valor: 0,
    color: 'purple'
  },
  {
    etiqueta: 'No procesado',
    valor: 0,
    color: 'bluegray'
  }
];


estadisticas_resultados_conteo_sin_no_procesados: datos_graficas[] = [
  {
    etiqueta: 'Correcto',
    valor: 0,
    color: 'green'
  },
  {
    etiqueta: 'Diferencia de 1 o 2',
    valor: 0,
    color: 'yellow'
  },
  {
    etiqueta: 'Diferencia de 3 o 4',
    valor: 0,
    color: 'orange'
  },
  {
    etiqueta: 'Diferencia de 5 o más',
    valor: 0,
    color: 'red'
  },      
  {
    etiqueta: 'Error',
    valor: 0,
    color: 'purple'
  },

];




public mapearEstadisticasResultados(   data: resultados_ordenados, mapeoEspecificaciones: 'carteles' | 'conteoDispositivos'  ): datos_graficas[] {

    let estadisticasResultados: datos_graficas[] = this.estadisticas_resultados_carteles;
  // Mapeo de `carteles` si se especifica
  if (mapeoEspecificaciones === 'carteles' && data.carteles) {
    
    estadisticasResultados[0].valor = data.carteles.muy_alta;
    estadisticasResultados[1].valor = data.carteles.alta;
    estadisticasResultados[2].valor = data.carteles.otro_idioma;
    estadisticasResultados[3].valor = data.carteles.media;
    estadisticasResultados[4].valor = data.carteles.baja;
    estadisticasResultados[5].valor = data.carteles.muy_baja;
    estadisticasResultados[6].valor = data.carteles.ninguna;
    estadisticasResultados[7].valor = data.carteles.no_procesados || 0;


  }

  // Mapeo de `conteo_dispositivos` si se especifica
  if (mapeoEspecificaciones === 'conteoDispositivos' && data.conteo_dispositivos) {
    estadisticasResultados = this.estadisticas_resultados_conteo;
    estadisticasResultados[4].valor = data.conteo_dispositivos.error;
    estadisticasResultados[5].valor = data.conteo_dispositivos.no_procesados || 0;

    // Para `diferencia`, sumamos los valores en el arreglo a las categorías correspondientes
    data.conteo_dispositivos.diferencia.forEach((diferencia) => {
      if (diferencia === 0) {
        estadisticasResultados[0].valor++;
      } else if (diferencia === 1 || diferencia === 2) {
        estadisticasResultados[1].valor++;
      } else if (diferencia === 3 || diferencia === 4) {
        estadisticasResultados[2].valor++;
      } else if (diferencia >= 5) {
        estadisticasResultados[3].valor++;
      }
    });
  }
  return estadisticasResultados;
}
                                //no se que te llega, tipalo si puedes Raul
public mapearEstadisticasEstados(data: any[]): datos_graficas[] {
  const estadisticasEstados = this.estadisticas_estados_auditoria;

  for(let i = 0; i < data.length; i++) {
    if (estadisticasEstados[i]) {
      estadisticasEstados[i].valor = data[i].num_auditorias;
    }
  }
  
  // Notifica a Angular sobre los cambios para que pueda actualizar la vista si es necesario
  return [...estadisticasEstados];
}

}

