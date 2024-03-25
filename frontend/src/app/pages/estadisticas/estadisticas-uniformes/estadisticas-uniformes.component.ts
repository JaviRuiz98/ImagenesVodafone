import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { UniformesService } from 'src/app/servicios/uniformes/uniformes.service';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';

import { pedidos } from 'src/app/interfaces/pedidos';
import { carrito } from 'src/app/interfaces/carrito';


@Component({
  selector: 'app-estadisticas-uniformes',
  templateUrl: './estadisticas-uniformes.component.html',
  styleUrls: ['./estadisticas-uniformes.component.css'],
 
})




export class EstadisticasUniformesComponent implements OnInit {


  rangeDates: Date[] | undefined;

  pedidosTodos!: pedidos[];
  pedidosFiltrados!: pedidos[];

  carritoTodos!: carrito[];
  carritoFiltrado!: carrito[];


  ///
  data: any;
  dataHombre: number[] = [];
  dataMujer: number[] = [];
  dataUnisex: number[] = [];
  options: any;


  constructor(private uniformesService: UniformesService) { }


  


  inicializar() {
    this.uniformesService.getPedidos().subscribe((pedidos) => {
      this.pedidosTodos = pedidos;
    })

    this.uniformesService.getCarrito().subscribe((carrito) => { //todos los items registrados en carritos
      this.carritoTodos = carrito;
    })

  }


  filtrarPorFecha() {
    this.pedidosFiltrados = [];
    this.carritoFiltrado = [];
    if (this.rangeDates) {
      this.pedidosFiltrados = this.pedidosTodos.filter((pedido) => {
        return new Date(pedido.fecha).getTime() >= new Date(this.rangeDates[0]).getTime() && new Date(pedido.fecha).getTime() <= new Date(this.rangeDates[1]).getTime();
      });
      this.carritoFiltrado = [];
      this.pedidosFiltrados.forEach((pedido) => {
        const carritosFiltrados = this.carritoTodos.filter(carrito => carrito.id_pedido === pedido.id);
        this.carritoFiltrado = [...this.carritoFiltrado, ...carritosFiltrados];
      });
  
    } 
 
  }

  ngOnInit(): void {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['Forro', 'Polo', 'Pantalon', 'Tarjeta', 'Lanyard', 'Lanyard Practicas'],
      datasets: [
          {
              label: 'Hombre',
              backgroundColor: documentStyle.getPropertyValue('--blue-500'),
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              data: this.dataHombre
          },
          {
              label: 'Mujer',
              backgroundColor: documentStyle.getPropertyValue('--pink-500'),
              borderColor: documentStyle.getPropertyValue('--pink-500'),
              data: this.dataMujer
          },
          {
              label: 'Unisex',
              backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
              borderColor: documentStyle.getPropertyValue('--yellow-500'),
              data: this.dataUnisex
          }
      ]
    };


    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary,
                  font: {
                      weight: 500
                  }
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
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

    this.inicializar();

    console.log(this.pedidosTodos);
  }

}