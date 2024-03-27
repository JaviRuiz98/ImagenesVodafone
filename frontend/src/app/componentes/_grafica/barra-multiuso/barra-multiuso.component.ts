import { ChangeDetectorRef, Component, Input, OnInit , SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';


@Component({
  selector: 'app-barra-multiuso',
  templateUrl: './barra-multiuso.component.html',
  styleUrls: ['./barra-multiuso.component.css'],
  standalone: true,
  imports: [ 
    ChartModule
  ]
})




export class BarraMultiusoComponent implements OnInit  {
  @Input() datos: datos_graficas[] = [];
  @Input () backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
  @Input () borderColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
  basicData: any;
  basicOptions: any;

  ngOnInit() {
      this.prepararDatosGrafica();
  }

  prepararDatosGrafica() {
      const labels = this.datos.map(dato => dato.etiqueta);
      const data = this.datos.map(dato => dato.valor);
      const backgroundColors = this.datos.map(dato => dato.color || 'rgba(0, 0, 0, 0.1)'); // Proporciona un color predeterminado si no se especifica
      const borderColor = this.datos.map(dato => dato.color || 'rgb(0, 0, 0)'); // Proporciona un color predeterminado si no se especifica

      this.basicData = {
          labels,
          datasets: [
              {
                  label: 'Data',
                  data,
                  backgroundColor: backgroundColors,
                  borderColor,
                  borderWidth: 1
              }
          ]
      };

      this.configurarOpcionesGrafica();
  }

  configurarOpcionesGrafica() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.basicOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              x: {
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