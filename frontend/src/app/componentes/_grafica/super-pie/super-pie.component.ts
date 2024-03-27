import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class SuperPieComponent implements OnChanges {

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
            }
        }
    };
  }
}
