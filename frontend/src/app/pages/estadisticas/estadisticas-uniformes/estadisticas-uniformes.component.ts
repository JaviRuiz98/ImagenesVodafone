import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { UniformesService } from 'src/app/servicios/uniformes/uniformes.service';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';

import { pedidos } from 'src/app/interfaces/pedidos';
import { carrito } from 'src/app/interfaces/carrito';
import { productos } from 'src/app/interfaces/productos';
import { caracteristicas_productos } from 'src/app/interfaces/caracteristicas';

@Component({
  selector: 'app-estadisticas-uniformes',
  templateUrl: './estadisticas-uniformes.component.html',
  styleUrls: ['./estadisticas-uniformes.component.css'],
 
})



export class EstadisticasUniformesComponent implements OnInit {


  productos_nombres = ['Forro', 'Polo', 'Pantalon', 'Tarjeta', 'Lanyard', 'Lanyard Practicas'];

  rangeDates: Date[] | undefined;

  pedidosTodos!: pedidos[];
  pedidosFiltrados!: pedidos[];

  carritoTodos!: carrito[];
  carritoFiltrado!: carrito[];

  productosTodos: productos[] = [];
  producto: productos; 

  productos_filtrados: productos[] = [];

  caracteristicas_productos!: caracteristicas_productos[];

  ///
  data: any;
  dataHombre: number[] = [];
  dataMujer: number[] = [];
  dataUnisex: number[] = [];
  options: any;

  documentStyle = getComputedStyle(document.documentElement);
  textColor = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
  surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');

  constructor(private uniformesService: UniformesService) {
    this.dataHombre = new Array(this.productos_nombres.length).fill(0);
    this.dataMujer = new Array(this.productos_nombres.length).fill(0);
    this.dataUnisex = new Array(this.productos_nombres.length).fill(0);
   }


  


  inicializar() {
    this.uniformesService.getPedidos().subscribe((pedidos) => {
      this.pedidosTodos = pedidos;
    })

    this.uniformesService.getCarrito().subscribe((carrito) => { //todos los items registrados en carritos
      this.carritoTodos = carrito;
    })

    this.uniformesService.getProductos().subscribe((productos) => {
      this.productosTodos = productos;
    })

    this.uniformesService.getCaracteristicas().subscribe((caracteristicas_productos) => {
      this.caracteristicas_productos = caracteristicas_productos;
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

      this.carritoFiltrado.forEach((carrito) => { // implementar dataHombre, mujer y unisex
        let caracteristica = this.caracteristicas_productos.find(caracteristica => caracteristica.id === carrito.id_caracteristicas_productos);
        let producto = this.productosTodos.find(producto => caracteristica.id_producto === producto.id);
        const producto_seleccionado: productos = {
          id: caracteristica.id_producto,
          nombre: producto.nombre,
          precio: producto.precio,
          genero: producto.genero,
          descripcion: producto.descripcion,
          imagenes: producto.imagenes,
          caracteristicas_productos: [],
          caracteristica_seleccionada:{
            id: caracteristica.id,
            id_producto: caracteristica.id_producto,
            genero: "",
            talla: caracteristica.talla,
            stock: 0
          },
          cantidad: carrito.cantidad,
        }

        this.productos_filtrados.push(producto_seleccionado);
      })

      console.log(this.productos_filtrados);

      this.productos_filtrados.forEach(producto => {
        for(let i = 0; i < this.productos_nombres.length; i++){
          if(producto.nombre == this.productos_nombres[i]){
            if(producto.genero == 'Hombre'){
              this.dataHombre[i] += producto.cantidad;
            }else if(producto.genero == 'Mujer'){
             this.dataMujer[i] += producto.cantidad; 
            }else if(producto.genero == null){
              this.dataUnisex[i] += producto.cantidad;
            }
          } 
        }

      })
      console.log(this.dataHombre, this.dataMujer, this.dataUnisex);

      

      this.data = {
        labels: this.productos_nombres,
        datasets: [
            {
                label: 'Hombre',
                backgroundColor: this.documentStyle.getPropertyValue('--blue-500'),
                borderColor: this.documentStyle.getPropertyValue('--blue-500'),
                data: this.dataHombre
            },
            {
                label: 'Mujer',
                backgroundColor: this.documentStyle.getPropertyValue('--pink-500'),
                borderColor: this.documentStyle.getPropertyValue('--pink-500'),
                data: this.dataMujer
            },
            {
                label: 'Unisex',
                backgroundColor: this.documentStyle.getPropertyValue('--yellow-500'),
                borderColor: this.documentStyle.getPropertyValue('--yellow-500'),
                data: this.dataUnisex
            }
        ]
      };

    }  
 
  }

  ngOnInit(): void {





    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
          legend: {
              labels: {
                  color: this.textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: this.textColorSecondary,
                  font: {
                      weight: 500
                  }
              },
              grid: {
                  color: this.surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: this.textColorSecondary
              },
              grid: {
                  color: this.surfaceBorder,
                  drawBorder: false
              }
          }

      }
  };

    this.inicializar();

    console.log(this.pedidosTodos);
  }

}