import { Component, OnInit } from '@angular/core';
import { productos } from 'src/app/interfaces/productos';
import { UniformesService } from 'src/app/servicios/uniformes/uniformes.service';
import { CarritoComponent } from 'src/app/componentes/carrito/carrito.component';

import { caracteristicas_productos } from 'src/app/interfaces/caracteristicas';

import { FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';

@Component({
  selector: 'app-uniformes',
  templateUrl: './uniformes.component.html',
  styleUrls: ['./uniformes.component.css'],

})



export class UniformesComponent implements OnInit {

  nueva_caracteristicas_form: FormGroup = this.formBuilder.group({
    cantidad: new FormControl('', [Validators.required, this.validaCantidad]),
    talla: new FormControl(0, [Validators.required, this.validaTalla]), 
  });

  formData  = this.nueva_caracteristicas_form?.value;

  productos: productos[];
  productos_carrito: productos[] = [] as productos[];
  producto_seleccionado: productos = {
    id: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    imagenes: {
      id_imagen: 0,
      url: ''
    },
    caracteristicas_productos: [],
    cantidad: 0
  }
  

  caracteristicas_productos!: caracteristicas_productos[];
  carritoVisible: boolean = false;

  verOpcionesProducto: boolean = false;
  opciones_producto!: productos[];
  url_imagenes_productos: string = 'http://validador-vf.topdigital.local/imagenes/imagenesProducto/';



  constructor( private uniformesService: UniformesService, private formBuilder: FormBuilder) {  
 
  
   }




  nuevoProducto(){

  }

  getSeverity(){

  }

  seleccionarTalla(caracteristica: caracteristicas_productos){
    this.nueva_caracteristicas_form.patchValue({ talla: caracteristica.talla });
  }

  seleccionarCantidade(producto: productos){
    this.nueva_caracteristicas_form.patchValue({ cantidad: producto.cantidad });
  }


 
  anadirCarrito(producto: productos){
    this.productos_carrito.push(producto);

  }

  seleccionarOpcionesProducto(producto: productos){
    this.verOpcionesProducto = true;
    this.producto_seleccionado = producto;
    this.producto_seleccionado.cantidad = 0;
  }

  ngOnInit() {
    this.inicializaProductos();
  }

  inicializaProductos() {
    this.uniformesService.getProductos().subscribe(
      (productos: productos[]) => {
        this.productos = productos;
        this.producto_seleccionado = this.productos[0];
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

  validaCantidad(control: FormControl) {
    const cantidad = control.value;
    if (cantidad <= 0) {
      return { invalidQuantity: true };
    }
    return null;
  }
  
  validaTalla(control: FormControl) {
    const talla = control.value;
    if (talla === 0) {
      return { invalidSize: true };
    }
    return null;
  }


}
