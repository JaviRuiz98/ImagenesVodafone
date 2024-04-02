import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { BarraMultiusoComponent } from 'src/app/componentes/_grafica/barra-multiuso/barra-multiuso.component';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';

@Component({
  selector: 'app-vertical-progress-bar',
  templateUrl: './vertical-progress-bar.html',
  styleUrls: ['./vertical-progress-bar.css'],
  standalone: true,
  imports: [ 
    CommonModule,
    BarraMultiusoComponent,
    ProgressBarModule
  ]
})
export class VerticalProgressBarComponent {

  constructor() { }
  @Input() valor:number;
  @Input () color:string;
  showTooltip: boolean = false; // Controla la visibilidad del tooltip
 

}
