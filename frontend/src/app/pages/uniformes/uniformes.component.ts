import { Component, OnInit } from '@angular/core';
import { UniformesModule } from './uniformes.module';
import { productos } from 'src/app/interfaces/productos';
import { UniformesService } from 'src/app/servicios/uniformes/uniformes.service';
import { Caracteristicas_productos } from 'src/app/interfaces/caracteristicas';
import { CarritoComponent } from 'src/app/componentes/carrito/carrito.component';
import { FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';


@Component({
  selector: 'app-uniformes',
  templateUrl: './uniformes.component.html',
  styleUrls: ['./uniformes.component.css'],

})



export class UniformesComponent implements OnInit {


  // carrito_form: FormGroup = this.formBuilder.group({
  //   nombre: new FormControl('', [Validators.required, Validators.minLength(2)]), 
  //   categoria: new FormControl('', Validators.required ),
  // });
  formGroup!: FormGroup;
  // formulario!: FormGroup;

  layout: any = 'list';

  productos!: productos[];
  opciones_caracteristicas!: Caracteristicas_productos[];
  sidebarVisible: boolean = false;

  verOpcionesProducto: boolean = false;
  opciones_producto!: productos[];
  url_imagenes_productos: string = 'http://validador-vf.topdigital.local/imagenes/imagenesProducto/';
  
  constructor(private formBuilder: FormBuilder, private uniformesService: UniformesService,private fb: FormBuilder ) {
    // this.formulario = this.fb.group({
    //   mueble: this.fb.group({
    //     id: [],
    //     nombre_mueble: ['', Validators.required],
    //     region: [''],
    //     expositores: this.fb.array([]) // Ahora es un FormArray
    //   }),
    // });
  }


  nuevoProducto(){

  }

  getSeverity(){

  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

 
  anadirCarrito(producto: productos){
    this.productos.find(productoSelect => {
      if(productoSelect.id === producto.id){
        producto.visible = !producto.visible;
      }
    })
  }

  deseleccionarOtrasTallas(opcion_caracteristica: Caracteristicas_productos) {
    const index = this.productos.findIndex(productito => productito.id === opcion_caracteristica.id_producto);

    this.productos[index].opciones_caracteristicas.forEach(item => {
      if (item.id !== opcion_caracteristica.id) {
          item.seleccionado = false;
      }
      else{
   //  item.seleccionado = item.seleccionado? false : true;
        if(item.seleccionado){
          item.seleccionado = false;
        }else{
          item.seleccionado = true;
        } 
      }
    });
    console.log(this.productos);
  }

  ngOnInit() {
    this.inicializaProductos();
    this.formGroup = new FormGroup({
      selectedCategory: new FormControl()
  });
  }

  inicializaProductos() {
    this.uniformesService.getProductos().subscribe((productos: productos[]) => {
      this.productos = productos;
      this.inicializaCaracteristicasProducto();
    });

  }

  inicializaCaracteristicasProducto() {
    this.uniformesService.getCaracteristicas().subscribe((caracteristicas: any[]) => {
      this.opciones_caracteristicas = caracteristicas;
      this.productos.map(producto => {
        producto.opciones_caracteristicas = this.opciones_caracteristicas.filter(caracteristica => caracteristica.id_producto === producto.id);
        producto.opciones_caracteristicas.forEach(opcion_caracteristica => {
          opcion_caracteristica.seleccionado = false;
        })
      })
      console.log(this.productos);
    });
    
  }


}
