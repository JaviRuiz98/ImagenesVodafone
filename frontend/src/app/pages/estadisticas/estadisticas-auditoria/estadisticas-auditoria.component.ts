import { Component, OnInit } from '@angular/core';
import { AuditoriaService } from 'src/app/servicios/auditoria/auditoria.service';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';

@Component({
  selector: 'app-estadisticas-auditoria',
  templateUrl: './estadisticas-auditoria.component.html',
  styleUrls: ['./estadisticas-auditoria.component.css']
})
export class EstadisticasAuditoriaComponent {

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

  constructor(
    private auditoriaService: AuditoriaService
  ) { };

  ngOnInit(): void {
    this.obtenerEstadisticasEstadosAuditoria();
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
}
