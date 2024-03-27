import { Component, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';

@Component({
  selector: 'app-super-donut',
  templateUrl: './super-donut.component.html',
  styleUrls: ['./super-donut.component.css'],
  standalone: true,
  imports: [
    ChartModule
  ],
})
export class SuperDonutComponent {
  @Input() datos_graficas: datos_graficas[] = [];

  data: any;

  options: any;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.actualizarGrafica();
    this.cdRef.detectChanges();
  }

  actualizarGrafica() {
    console.log('datos dentro pie', this.datos_graficas);
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
        labels: this.datos_graficas.map((d) => d.etiqueta),
        datasets: [
            {
                data: this.datos_graficas.map((d) => d.valor),
                backgroundColor: this.datos_graficas.map((d) => documentStyle.getPropertyValue(`--${d.color}-500`)),                  
                hoverBackgroundColor: this.datos_graficas.map((d) => documentStyle.getPropertyValue(`--${d.color}-400`)),
            }
        ]
    };

    console.log('data', this.data.datasets[0].data);
    console.log('color', this.data.labels);

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
