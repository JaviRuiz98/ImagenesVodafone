import { Component, OnInit } from '@angular/core';
import { productos } from 'src/app/interfaces/productos';
import { UniformesService } from 'src/app/servicios/uniformes/uniformes.service';
import { CarritoComponent } from 'src/app/componentes/carrito/carrito.component';

import { caracteristicas_productos } from 'src/app/interfaces/caracteristicas';


@Component({
  selector: 'app-uniformes',
  templateUrl: './uniformes.component.html',
  styleUrls: ['./uniformes.component.css'],

})



export class UniformesComponent implements OnInit {

  constructor( private uniformesService: UniformesService ) { }

  productos!: productos[];

  caracteristicas_productos!: caracteristicas_productos[];
  sidebarVisible: boolean = false;

  verOpcionesProducto: boolean = false;
  opciones_producto!: productos[];
  url_imagenes_productos: string = 'http://validador-vf.topdigital.local/imagenes/imagenesProducto/';


  nuevoProducto(){

  }

  getSeverity(){

  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

 
  anadirCarrito(producto: productos){

  }

  ngOnInit() {
    this.inicializaProductos();
  }

  inicializaProductos() {
    this.uniformesService.getProductos().subscribe(
      (productos: productos[]) => {
        this.productos = productos;
        this.inicializaCaracteristicasProducto();
      }
    );

  }

  inicializaCaracteristicasProducto() {
    this.uniformesService.getCaracteristicas().subscribe(
      (caracteristicas: caracteristicas_productos[]) => {
        this.caracteristicas_productos = caracteristicas;
        this.productos.map(producto => {
          producto.caracteristicas_productos = this.caracteristicas_productos.filter(caracteristica => caracteristica.id_producto === producto.id);
        })
        console.log(this.productos);
      }
    );
  }
}
