import { Component, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { datos_graficas, datos_graficas_multidatos } from 'src/app/interfaces/datos_graficas';

@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrls: ['./stacked-bar.component.css'],
  standalone: true,
  imports: [
    ChartModule
  ],
})
export class StackedBarComponent {
  @Input() datos: datos_graficas_multidatos;

  data: any;
  options: any;

  ngOnChanges() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Definir colores con opacidad para el interior de las barras
    const colorsInterior = {
        'orange': 'rgba(255, 165, 0, 0.4)',
        'green': 'rgba(0, 128, 0, 0.4)',
        'red': 'rgba(255, 0, 0, 0.4)'
    };

    // Definir colores con opacidad total para los bordes
    const colorsBorde = {
        'orange': 'rgba(255, 165, 0, 1)',
        'green': 'rgba(0, 128, 0, 1)',
        'red': 'rgba(255, 0, 0, 1)'
    };

    this.data = {
        labels: this.datos?.etiquetas,
        datasets: []
    };

    for (let i = 0; i < this.datos?.leyenda.length; i++) {
        this.data?.datasets.push({
            type: 'bar',
            label: this.datos.leyenda[i],
            backgroundColor: colorsInterior[this.datos.color[i]], // Usar color con opacidad 0.4 para el interior
            borderColor: colorsBorde[this.datos.color[i]], // Usar el mismo color con opacidad 1 para el borde
            borderWidth: 1, // Grosor del borde
            data: this.datos.datos[i]
        });
    }

      this.options = {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
              tooltips: {
                  mode: 'index',
                  intersect: false
              },
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              x: {
                  stacked: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
                  stacked: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };
  }
}
