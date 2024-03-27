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

    this.options = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed;
                  const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                  const percentage = (value / total * 100).toFixed(2) + '%';
                  return label + ': ' + percentage;
                }
              }
            }
        }
    };
  }
}
