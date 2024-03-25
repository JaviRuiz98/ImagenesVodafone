import { Component, OnInit } from '@angular/core';
import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';
import { resultados_ordenados } from 'src/app/interfaces/resultados_ordenados';

@Component({
  selector: 'app-estadisticas-auditoria',
  templateUrl: './estadisticas-auditoria.component.html',
  styleUrls: ['./estadisticas-auditoria.component.css']
})
export class EstadisticasAuditoriaComponent {

  estadisticas_estados_auditoria: datos_graficas[] = [];
  estadisticas_resultados_carteles: datos_graficas[] = [];
  estadisticas_resultados_conteo: datos_graficas[] = [];

  constructor(
    private auditoriaService: AuditoriaService
  ) { };

  ngOnInit(): void {
    this.inicializarObjetosDeEstadisticas();
    
  }

  obtenerEstadisticasEstadosAuditoria() {
    this.auditoriaService.getEstadisticasEstadosAuditoria().subscribe(
      (data) => {
        const estadisticas_estados_auditoria_raw = data;
        console.log('estadisticas_estados_auditoria', this.estadisticas_estados_auditoria);


        for(let i = 0; i < estadisticas_estados_auditoria_raw.length; i++) {
          this.estadisticas_estados_auditoria[i].valor = estadisticas_estados_auditoria_raw[i].num_auditorias;
        }

        console.log('estadisticas_estados_auditoria', this.estadisticas_estados_auditoria);

        this.estadisticas_estados_auditoria = [...this.estadisticas_estados_auditoria];
      }, (error) => {
        console.log(error);
      }
    )
  }

  obtenerEstadisticasResultadosAuditoria() {
    this.auditoriaService.getEstadisticasResultadosAuditoria().subscribe(
      (data: resultados_ordenados) => {
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
  
        // Para `diferencia`, sumamos los valores en el arreglo a las categorías correspondientes
        data.conteo_dispositivos.diferencia.forEach((diferencia) => {
          if (diferencia === 0) {
            this.estadisticas_resultados_conteo[0].valor++;
          } else if (diferencia === 1 || diferencia === 2) {
            this.estadisticas_resultados_conteo[1].valor++;
          } else if (diferencia === 3 || diferencia === 4) {
            this.estadisticas_resultados_conteo[2].valor++;
          } else if (diferencia >= 5) {
            this.estadisticas_resultados_conteo[3].valor++;
          }
        });
  
        // Actualizar vistas si es necesario
        this.estadisticas_resultados_carteles = [...this.estadisticas_resultados_carteles];
        this.estadisticas_resultados_conteo = [...this.estadisticas_resultados_conteo];
  
        console.log('estadisticas_resultados_auditoria', data);
      }, (error) => {
        console.log(error);
      }
    );
  }
  

  inicializarObjetosDeEstadisticas() {
    this.estadisticas_estados_auditoria = [
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

    this.obtenerEstadisticasEstadosAuditoria();
    this.obtenerEstadisticasResultadosAuditoria();
  }
}
