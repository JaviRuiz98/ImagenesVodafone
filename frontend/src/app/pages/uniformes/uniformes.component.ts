import { Component, OnInit } from '@angular/core';
import { productos } from 'src/app/interfaces/productos';
import { UniformesService } from 'src/app/servicios/uniformes/uniformes.service';
import { CarritoComponent } from 'src/app/componentes/carrito/carrito.component';

import { caracteristicas_productos } from 'src/app/interfaces/caracteristicas';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-uniformes',
  templateUrl: './uniformes.component.html',
  styleUrls: ['./uniformes.component.css'],
  providers: [ MessageService],

})



export class UniformesComponent implements OnInit {

 

  productosTodos!: productos[];
  productos!: productos[];
  productos_carrito: productos[] = [] as productos[];
  producto_seleccionado: productos = {
    id: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    genero: '',
    imagenes: {
      id_imagen: 0,
      url: ''
    },
    caracteristicas_productos: [],
    caracteristica_seleccionada: {
      id: 0,
      id_producto: 0,
      genero: '',
      talla: null,
      stock: 0
    },
    cantidad: 0
  }
  

  caracteristicas_productos!: caracteristicas_productos[];
  carritoVisible: boolean = false;

  verOpcionesProducto: boolean = false;
  opciones_producto!: productos[];

  cantidad_valida: boolean = true;
  talla_valida: boolean = true;
  url_imagenes_productos: string = 'http://validador-vf.topdigital.local/imagenes/imagenesProducto/';

  opciones_generos: any[] = [{label: 'Hombre', value: 'Hombre'}, {label: 'Mujer', value: 'Mujer'}];
  opcion_genero: string = 'Hombre';
  constructor( private uniformesService: UniformesService, private messageService: MessageService) {  
 
  
   }


 

 
 
  anadirCarrito(producto: productos){
  
    if(this.producto_seleccionado.cantidad <= 0 || this.producto_seleccionado.cantidad  > this.producto_seleccionado.caracteristica_seleccionada.stock) {this.cantidad_valida = false;} else{ this.cantidad_valida = true; }

    if(this.producto_seleccionado.caracteristicas_productos.length ==1 ) {   
      this.talla_valida = true;
      this.producto_seleccionado.caracteristica_seleccionada = this.producto_seleccionado.caracteristicas_productos[0];

    }else if(this.producto_seleccionado.caracteristica_seleccionada.talla == null){
      this.talla_valida = false;
    }else{
      this.talla_valida = true;
    } 
    if(this.cantidad_valida == false || this.talla_valida == false) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Rellena los campos obligatorios' });
      return;
    } 
    this.verOpcionesProducto = false;
    this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Añadido al carrito' });
 
    let productoClonado = Object.assign({}, this.producto_seleccionado);

    let productoEncontrado = false;

    for (let i = 0; i < this.productos_carrito.length; i++) {
      if (this.productos_carrito[i].caracteristica_seleccionada.id == this.producto_seleccionado.caracteristica_seleccionada.id) {
        // Si encontramos el producto con la misma característica seleccionada, sumamos la cantidad.
        this.productos_carrito[i].cantidad += this.producto_seleccionado.cantidad;
        productoEncontrado = true;
        break; // Salimos del ciclo ya que hemos actualizado el producto existente.
      }
    }
  
    if (!productoEncontrado) {
      // Si el producto no fue encontrado, lo añadimos al carrito.
      // Es importante realizar una copia para evitar problemas de referencia.
      this.productos_carrito.push(productoClonado);
    }
  }

  seleccionarOpcionesProducto(producto: productos){
    this.verOpcionesProducto = true;
    this.producto_seleccionado = producto;
    this.producto_seleccionado.cantidad = 1;
    this.producto_seleccionado.caracteristica_seleccionada = {
      id: 0,
      id_producto: producto.id,
      genero: "",
      talla: null,
      stock: 0
    };
    this.cantidad_valida = true; 
     
  }


  seleccionarTalla(caracteristica: caracteristicas_productos){
    this.producto_seleccionado.caracteristica_seleccionada = caracteristica;
    this.producto_seleccionado.caracteristica_seleccionada.talla = caracteristica.talla;
  }

  cambiarOpcionGenero(event: any) {
    this.producto_seleccionado.caracteristica_seleccionada.genero = this.opcion_genero;
    this.productos = this.productosTodos.filter(producto => (producto.genero ==  this.opcion_genero) || (producto.genero == null));

  }


  validarCantidades(producto: productos){
    if(producto.cantidad  >= producto.caracteristica_seleccionada.stock) {
      this.cantidad_valida = false;
    } else{
       this.cantidad_valida = true; 
      }
  }

  ngOnInit() {
    this.inicializaProductos();

    setTimeout(() => {
      this.productos = this.productosTodos.filter(producto => (producto.genero == 'Hombre') || (producto.genero == null));
    },1000)

 

  }

  inicializaProductos() {
    this.productos = [];
    this.uniformesService.getProductos().subscribe(
      (productos: productos[]) => {
        this.productosTodos = productos;
      //  this.producto_seleccionado = this.productosTodos[0];
        this.inicializaCaracteristicasProducto();
      }
    );

  }
  mostrarCarrito(event: boolean) {
    this.carritoVisible = false;
    if (event) {
      this.carritoVisible = true;
    } else {
      this.carritoVisible = false;
    }
  }

  inicializaCaracteristicasProducto() {
    this.uniformesService.getCaracteristicas().subscribe(
      (caracteristicas: caracteristicas_productos[]) => {
        this.caracteristicas_productos = caracteristicas;
        this.productosTodos.map(producto => {
          producto.caracteristicas_productos = this.caracteristicas_productos.filter(caracteristica => caracteristica.id_producto === producto.id);
        })
        console.log(this.productos);
      }
    );
  }
 

}