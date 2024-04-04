import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';
import { format } from 'date-fns';

@Component({
  selector: 'app-super-line-chart',
  templateUrl: './super-line-chart.component.html',
  styleUrls: ['./super-line-chart.component.css'],
  standalone: true,
  imports: [ChartModule],
})
export class SuperLineChartComponent implements  OnChanges {
  @Input() titulo: string;
  @Input() data_grafica: datos_graficas[] = [];


  data: any;
  options: any;

  constructor( private cdRef: ChangeDetectorRef) {}



  ngOnChanges(changes: SimpleChanges) {
    this.initOptions();
    this.initData();
  }


  private initOptions() {
    this.options = {
      plugins: {
        title: {
          display: false,
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
        legend: {
          display: false,
        }
      },
     
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  }
  

  private initData() {
    const documentStyle = getComputedStyle(document.documentElement);

    if (this.data_grafica.length > 0) {
      let labels: string[] = this.data_grafica.map((data) => {
        if (this.todosValores2SonDistintosDeNullYFecha([data])) { 
          return format(new Date(data.valor2), 'MMMM - yyyy');
        } else {
          return data.etiqueta.toString();
        }
      });

      this.data = {
        labels: labels,
        datasets: [
            {
                data: this.data_grafica.map((d) => d.valor),
                backgroundColor: this.data_grafica.map((d) => documentStyle.getPropertyValue(`--${d.color}-500`)),                  
                hoverBackgroundColor: this.data_grafica.map((d) => documentStyle.getPropertyValue(`--${d.color}-400`)),
            }
        ], 
      };

    }
  }

  
 todosValores2SonDistintosDeNullYFecha(datosGraficas: datos_graficas[]): boolean {
  return datosGraficas.every((dato) => dato.valor2 !== null && dato.valor2 instanceof Date);
}

}
