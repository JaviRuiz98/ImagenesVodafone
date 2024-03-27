import { Component, Input, OnInit } from '@angular/core';
// Importa ChartModule correctamente.
import { ChartModule } from 'primeng/chart';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';
// Asegúrate de que la importación de date-fns es correcta.
import { format } from 'date-fns';

@Component({
  selector: 'app-super-line-chart',
  templateUrl: './super-line-chart.component.html',
  styleUrls: ['./super-line-chart.component.css'],
  standalone: true,
  imports: [ChartModule],
})
export class SuperLineChartComponent implements OnInit {
  @Input() titulo: string;
  @Input() data_grafica: datos_graficas[] = [];
  @Input() backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
  @Input() borderColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;

  data: any;
  options: any;

  constructor() {}

  ngOnInit() {
    this._initOptions();
    this._initData();
  }

  private _initOptions() {
    this.options = {
      plugins: {
        title: {
          display: true,
          text: this.titulo,
          align: 'center',
          font: {
            size: 24,
            weight: 'bold',
          },
          padding: {
            top: 10,
            bottom: 10,
          },
        },
      },
    };
  }

  private _initData() {
    if (this.data_grafica.length > 0) {
      let labels: string[] = this.data_grafica.map((data) => {
        if (todosValores2SonDistintosDeNullYFecha([data])) { // Asegúrate de que esta función es accesible y corrige según sea necesario.
          return format(new Date(data.valor2), 'MMMM - yyyy');
        } else {
          return data.valor.toString();
        }
      });

      this.data = {
        labels: labels,
        datasets: [
          {
            data: this.data_grafica.map((data) => data.valor),
            borderColor: this.borderColor,
            backgroundColor: this.backgroundColor,
            borderWidth: 1,
            tension: 0.4,
          },
        ],
      };
    }
  }
}

function todosValores2SonDistintosDeNullYFecha(datosGraficas: datos_graficas[]): boolean {
  return datosGraficas.every((dato) => dato.valor2 !== null && dato.valor2 instanceof Date);
}
