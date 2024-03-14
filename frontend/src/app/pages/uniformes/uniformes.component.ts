import { Component, OnInit } from '@angular/core';
import { UniformesModule } from './uniformes.module';
import { productos } from 'src/app/interfaces/productos';
import { UniformesService } from 'src/app/servicios/uniformes/uniformes.service';
import { Opciones_caracteristicas } from 'src/app/interfaces/caracteristicas';


@Component({
  selector: 'app-uniformes',
  templateUrl: './uniformes.component.html',
  styleUrls: ['./uniformes.component.css'],

})



export class UniformesComponent implements OnInit {

  layout: any = 'list';

  productos!: productos[];

  opciones_caracteristicas!: Opciones_caracteristicas[];
  sidebarVisible: boolean = false;

  verOpcionesProducto: boolean = false;
  opciones_producto!: productos[];
  url_imagenes_productos: string = 'http://validador-vf.topdigital.local/imagenes/imagenesProducto/';

  constructor(private uniformesService: UniformesService) { }


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
    this.uniformesService.getProductos().subscribe((productos: productos[]) => {
      this.productos = productos;

    });
    this.inicializaCaracteristicasProducto();
  }

  inicializaCaracteristicasProducto() {
    this.uniformesService.getCaracteristicas().subscribe((caracteristicas: any[]) => {
      this.opciones_caracteristicas = caracteristicas;
      this.productos.map(producto => {
        producto.opciones_caracteristicas = this.opciones_caracteristicas.filter(caracteristica => caracteristica.id_producto === producto.id);

      })
      console.log(this.productos);
    });
    
  }


}
