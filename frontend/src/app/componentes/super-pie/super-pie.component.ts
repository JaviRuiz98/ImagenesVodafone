import { Component, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';

@Component({
  selector: 'app-super-pie',
  templateUrl: './super-pie.component.html',
  styleUrls: ['./super-pie.component.css'],
  standalone: true,
  imports: [
    ChartModule
  ],
})
export class SuperPieComponent {

  @Input() datos_graficas: datos_graficas[] = [];

  data: any;

  options: any;

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data = {
          labels: this.datos_graficas.map((d) => d.etiqueta),
          datasets: [
              {
                  data: this.datos_graficas.map((d) => d.valor),
                  //backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                  backgroundColor: this.datos_graficas.map((d) => documentStyle.getPropertyValue(`--${d.color}-500`)),                  
                  //hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                  hoverBackgroundColor: this.datos_graficas.map((d) => documentStyle.getPropertyValue(`--${d.color}-400`)),
              }
          ]
      };

      this.options = {
          plugins: {
              legend: {
                  labels: {
                      usePointStyle: true,
                      color: textColor
                  }
              }
          }
      };
  }
}
