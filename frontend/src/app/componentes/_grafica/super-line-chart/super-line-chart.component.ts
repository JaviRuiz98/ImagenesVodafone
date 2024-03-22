import { Component, Input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';
import { format } from 'date-fns';

@Component({
  selector: 'app-super-line-chart',
  templateUrl: './super-line-chart.component.html',
  styleUrls: ['./super-line-chart.component.css'],
  standalone: true,
  imports: [
    ChartModule
  ],
})

export class SuperLineChartComponent implements OnInit {

  @Input () titulo: string;
  @Input () data_grafica: datos_graficas[] = [];
  @Input ()  backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
  @Input ()borderColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
 
  data: any;
  options:any;

  constructor() { }

  ngOnInit() {
    _initOptions();
    _initData();
  
  
  }

}
function _initOptions() {
  this.options = {
    plugins: {
      title: {
        display: true,
        text: this.titulo,
        align: 'center',
        font: {
          size: 24,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 10
        }
      }
    }
  };
}


function todosValores2SonDistintosDeNullYFecha(datosGraficas: datos_graficas[]): boolean {
  return datosGraficas.every((dato: datos_graficas) => { 
      return dato.valor2 !== null && dato.valor2 instanceof Date; 
  });
}

function _initData() {
  if (this.data_grafica.length > 0) {
    
  let labels: string [] = [];

  if (todosValores2SonDistintosDeNullYFecha(this.data_grafica)) {
   labels = this.data_grafica.map((data) => {
      return format(new Date(this.data_grafica.valor2), 'MMMM - yyyy',);
    });
  }else {
    labels = this.data_grafica.map((data) => data.valor.toString());
  }
   
    this.data = {
      labels: this.data_grafica[0].labels,
      datasets: [
        {
          
          data: this.data_grafica.map((data: datos_graficas) => data.valor),
          borderColor: this.borderColor,
          backgroundColor: this.backgroundColor,
          borderWidth: 1,
          tension: 0.4,
        }
      ]
    };
  }

  

}

