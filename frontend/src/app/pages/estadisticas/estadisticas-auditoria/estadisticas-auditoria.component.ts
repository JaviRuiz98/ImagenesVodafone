import { Component, OnDestroy } from '@angular/core';
import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';
import { datos_graficas, datos_graficas_multidatos } from 'src/app/interfaces/datos_graficas';
import { resultados_ordenados } from 'src/app/interfaces/resultados_ordenados';
import { conteo_elementos_procesados_auditoria } from '../interface/conteoElementosProcesadosAuditoria';
import { conteo_movimientos_auditoria } from '../interface/conteoMovimientosAuditoria';
import { tienda } from 'src/app/interfaces/tienda';
import { ProcesadosService } from 'src/app/servicios/procesados/procesados.service';
import { datos_informe } from 'src/app/interfaces/datos_informe';
import { Observable } from 'rxjs';
import { FiltroState } from 'src/app/state/estadisticas/elementoSeleccionados.state';
import { en_progreso_y_tiendas_totales } from '../interface/enProgresoYTiendasTotales';

@Component({
  selector: 'app-estadisticas-auditoria',
  templateUrl: './estadisticas-auditoria.component.html',
  styleUrls: ['./estadisticas-auditoria.component.css']
})
export class EstadisticasAuditoriaComponent  {

  estadisticas_estados_auditoria: datos_graficas[] = [];
  estadisticas_resultados_carteles: datos_graficas[] = [];
  estadisticas_resultados_conteo: datos_graficas[] = [];
  estadisticas_procesados_diarios: datos_graficas[] = [];
  estadisticas_procesados_dado_estado: conteo_elementos_procesados_auditoria;

  total_tiendas: number = 0;
  estadisticas_tiendas_en_progreso: datos_graficas[] = [];

  estadisticas_movimientos_auditoria: datos_graficas_multidatos;

  public loading$: Observable<boolean>;
  public periodo_fechas$: Observable<Date[]>;

  constructor(
    private auditoriaService: AuditoriaService,
    private procesadosService: ProcesadosService,
    private state: FiltroState
  ) {
    this.setStateSelectors();
  };

  private setStateSelectors() {
    this.loading$ = this.state.loading$;
    this.periodo_fechas$ = this.state.periodoFechas$;

  }

  ngOnInit(): void {
    this.periodo_fechas$.subscribe(fechas => {
      this.inicializarObjetosDeEstadisticas();

      this.obtenerEstadisticasEstadosAuditoria(fechas);
      this.obtenerEstadisticasResultadosAuditoria(fechas);
      this.obtenerEstadisticasProcesadosDadoEstadoAuditoria(fechas);
      this.obtenerTiendasConAuditoriaEnProgreso(fechas);
      this.obtenerNumeroProcesadosDiarios(fechas);
      this.obtenerMovimientosAuditorias(fechas);
    });

  }
/*Te lo comento, no me interesa que se resete el estado de la fecha al cambiar de vista */
  // ngOnDestroy(): void {
  //   this.state.reset();
  // }

  obtenerMovimientosAuditorias(fechas: Date[]) {
    this.auditoriaService.getMovimientosAuditorias(fechas).subscribe(
      (data: conteo_movimientos_auditoria) => {
        this.estadisticas_movimientos_auditoria.etiquetas = data.fechas;
        this.estadisticas_movimientos_auditoria.datos = [
          data.iniciadas,
          data.finalizadas,
          data.caducadas
        ]

        this.estadisticas_movimientos_auditoria = { ...this.estadisticas_movimientos_auditoria };
    } , (error) => {
      console.error(error);
    })
  }

  obtenerEstadisticasEstadosAuditoria(fechas: Date[]) {
    this.auditoriaService.getEstadisticasEstadosAuditoria(fechas).subscribe(
      (data) => {
        const estadisticas_estados_auditoria_raw = data;

        // Logica del mapeado teniendo en cuenta que se ignora el estado 1 (En progreso)
        const id_estados_excluidos: number[] = [1];
        let estados_ignorados = 0;
        for(let i = 0; i < estadisticas_estados_auditoria_raw.length; i++) {
          if(!id_estados_excluidos.includes(estadisticas_estados_auditoria_raw[i].id)) {
            this.estadisticas_estados_auditoria[i-estados_ignorados].valor = estadisticas_estados_auditoria_raw[i].num_auditorias;
          } else {
            estados_ignorados++;
          }
        }

        this.estadisticas_estados_auditoria = [...this.estadisticas_estados_auditoria];
      }, (error) => {
        console.error(error);
      }
    )
  }

  obtenerTiendasConAuditoriaEnProgreso(fechas: Date[]) {
    this.auditoriaService.enProgresoYTiendasTotales(fechas).subscribe(
      (data: en_progreso_y_tiendas_totales) => {

        this.estadisticas_tiendas_en_progreso[0].valor = data.num_auditorias_en_progreso;
        this.estadisticas_tiendas_en_progreso[1].valor = data.tiendas_totales - data.num_auditorias_en_progreso;

        this.estadisticas_tiendas_en_progreso = [...this.estadisticas_tiendas_en_progreso];
    })
  }

  obtenerEstadisticasResultadosAuditoria(fechas: Date[]) {
    this.auditoriaService.getEstadisticasResultadosAuditoria(fechas).subscribe(
      (data: resultados_ordenados) => {
        console.log('data', data);
        // Mapeo de `carteles`
        this.estadisticas_resultados_carteles[0].valor = data.carteles.muy_alta;
        this.estadisticas_resultados_carteles[1].valor = data.carteles.alta;
        this.estadisticas_resultados_carteles[2].valor = data.carteles.otro_idioma;
        this.estadisticas_resultados_carteles[3].valor = data.carteles.media;
        this.estadisticas_resultados_carteles[4].valor = data.carteles.baja;
        this.estadisticas_resultados_carteles[5].valor = data.carteles.muy_baja;
        this.estadisticas_resultados_carteles[6].valor = data.carteles.ninguna;
        this.estadisticas_resultados_carteles[7].valor = data.carteles.no_procesados || 0;
  
        // Mapeo de `conteo_dispositivos`
        this.estadisticas_resultados_conteo[4].valor = data.conteo_dispositivos.error;
        this.estadisticas_resultados_conteo[5].valor = data.conteo_dispositivos.no_procesados || 0;
  
        // Mapeo para la diferencia de cuenta de dispositivos
        this.estadisticas_resultados_conteo[0].valor = data.conteo_dispositivos.diferencia[0];
        this.estadisticas_resultados_conteo[1].valor = data.conteo_dispositivos.diferencia[1] + data.conteo_dispositivos.diferencia[2];
        this.estadisticas_resultados_conteo[2].valor = data.conteo_dispositivos.diferencia[3] + data.conteo_dispositivos.diferencia[4];
        this.estadisticas_resultados_conteo[3].valor = data.conteo_dispositivos.diferencia.slice(5).reduce((a, b) => a + b, 0);
        this.estadisticas_resultados_conteo[4].valor = data.conteo_dispositivos.error;
        this.estadisticas_resultados_conteo[5].valor = data.conteo_dispositivos.no_procesados;
  
        // Actualizar vistas si es necesario
        this.estadisticas_resultados_carteles = [...this.estadisticas_resultados_carteles];
        this.estadisticas_resultados_conteo = [...this.estadisticas_resultados_conteo];
  
      }, (error) => {
        console.error(error);
      }
    );
  }
  
  obtenerEstadisticasProcesadosDadoEstadoAuditoria(fechas: Date[]) {
    this.auditoriaService.getEstadisticasProcesadosDadoEstadoAuditoria(fechas).subscribe(
      (data: conteo_elementos_procesados_auditoria) => {
        this.estadisticas_procesados_dado_estado = data;

        // Permitir solo dos decimales
        this.estadisticas_procesados_dado_estado.en_progreso.porcentaje = parseFloat(this.estadisticas_procesados_dado_estado?.en_progreso.porcentaje.toFixed(1))
        this.estadisticas_procesados_dado_estado.finalizada.porcentaje = parseFloat(this.estadisticas_procesados_dado_estado?.finalizada.porcentaje.toFixed(1))
        this.estadisticas_procesados_dado_estado.caducada.porcentaje = parseFloat(this.estadisticas_procesados_dado_estado?.caducada.porcentaje.toFixed(1))

      }, (error) => {
        console.error(error);
      }
    );
  }



  obtenerNumeroProcesadosDiarios(fechas: Date[]) {
    this.procesadosService.getProcesadosAndTiempo(fechas).subscribe(
      (data: any) => {
        this.estadisticas_procesados_diarios = [];
        for (let i = 0; i < data.fechas.length; i++) {
          this.estadisticas_procesados_diarios.push({
            valor: data.procesados[i],
            etiqueta: data.fechas[i]
          })
        }

        this.estadisticas_procesados_diarios = [...this.estadisticas_procesados_diarios];
      }, (error) => {
        console.error(error);
      })
  }

  async inicializarObjetosDeEstadisticas() {
    this.estadisticas_estados_auditoria = [
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

    this.estadisticas_tiendas_en_progreso = [
      {
        etiqueta: 'En progreso',
        valor: 0,
        color: 'yellow'
      },  
      {
        etiqueta: 'Ya auditadas',
        valor: 0,
        color: 'bluegray'
      }
    ]

    this.estadisticas_resultados_carteles = [
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

    this.estadisticas_resultados_conteo = [
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
        etiqueta: 'Imagen no válida',
        valor: 0,
        color: 'purple'
      },
      {
        etiqueta: 'No procesado',
        valor: 0,
        color: 'bluegray'
      }
    ]

    this.estadisticas_movimientos_auditoria = {
      color: ['orange', 'green', 'red'],
      leyenda: ['Iniciadas', 'Finalizada', 'Caducada'],
      etiquetas: [],
      datos: []
    }
  }
}
