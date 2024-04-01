import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { BarraMultiusoComponent } from 'src/app/componentes/_grafica/barra-multiuso/barra-multiuso.component';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';

@Component({
  selector: 'app-estadistica_unica_respuesta',
  templateUrl: './estadistica_unica_respuesta.component.html',
  styleUrls: ['./estadistica_unica_respuesta.component.css'],
  standalone: true,
  imports: [ 
    CommonModule,
    BarraMultiusoComponent,
    ProgressBarModule
  ]
})
export class EstadisticaUnicaRespuestaComponent {

  constructor() { }
  @Input() valor:number;
  @Input () color:string;
  showTooltip: boolean = false; // Controla la visibilidad del tooltip
 

}
