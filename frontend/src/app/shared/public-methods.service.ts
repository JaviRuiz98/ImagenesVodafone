import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { datos_graficas } from '../interfaces/datos_graficas';
import { resultados_ordenados } from '../interfaces/resultados_ordenados';


@Injectable({
  providedIn: 'root'
})
export class PublicMethodsService {

  constructor(
    private datePipe: DatePipe,
  ) { }

  getSeverityCartel(result: string): string {
    switch (result) {
        case 'muy alta':
            return 'success' as string;
 
        case 'alta':
        case 'media':
        case 'otro idioma':
            return 'warning' as string;

        case 'baja':
        case 'muy baja':
        case 'ninguna':
            return 'danger' as string;
       
        default:
            return 'primary';
    }
  };

    getSeverityDispositivos(numero_dispositivos: number, huecos_esperados: number): string {
        if (numero_dispositivos == huecos_esperados) {
            return 'success';
        } else if ( Math.abs(numero_dispositivos - huecos_esperados) == 1 ) { //el error es de solo un dispositivo
            return 'warning';
        } else {
            return 'danger';
        }
    }

    getSeverityEstadoAuditoria(estado: string): string {
        switch (estado) {
            case 'en progreso':
                return 'warning' as string;
            case 'finalizada':
                return 'success' as string;
            case 'caducada':
                return 'danger' as string;
            default:
                return 'primary';
        }
    }

    formatDate(date: Date): string | null {
        return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm');
      }

      estadisticas_estados_auditoria = [
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
      estadisticas_resultados_carteles = [
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
  
      estadisticas_resultados_conteo = [
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
      ]

      //se modifica y pasa por referencia
      /*Ejemplo de llamda 
        this.mapearEstadisticasResultados(data, this.estadisticas_resultados_carteles, {carteles: true});
        this.mapearEstadisticasResultados(data, this.estadisticas_resultados_conteo, {conteoDispositivos: true});
    */
      public mapearEstadisticasResultados(
         data: resultados_ordenados,
         estadisticasResultados: datos_graficas[],
         mapeoEspecificaciones: {carteles?: boolean, conteoDispositivos?: boolean, numDiferencia?:number  } = {}) {

        // Mapeo de `carteles` si se especifica
        if (mapeoEspecificaciones.carteles && data.carteles) {
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
        if (mapeoEspecificaciones.conteoDispositivos && data.conteo_dispositivos) {
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
      }
      
      public mapearEstadisticasEstados(data: any[], estadisticasEstados: any[]) {
     
        for(let i = 0; i < data.length; i++) {
          if (estadisticasEstados[i]) {
            estadisticasEstados[i].valor = data[i].num_auditorias;
          }
        }
        
        // Notifica a Angular sobre los cambios para que pueda actualizar la vista si es necesario
        return [...estadisticasEstados];
      }
      
      
}
