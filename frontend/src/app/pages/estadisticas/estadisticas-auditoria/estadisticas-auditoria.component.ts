import { Component } from '@angular/core';

@Component({
  selector: 'app-estadisticas-auditoria',
  templateUrl: './estadisticas-auditoria.component.html',
  styleUrls: ['./estadisticas-auditoria.component.css']
})
export class EstadisticasAuditoriaComponent {

  data: any;
  chartData = [0, 0, 0, 0]; //Cantidad de resultados por bueno, notable, medio y malo
  chartOptions: any;
  
}
