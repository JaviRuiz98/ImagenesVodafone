import { Component, OnInit } from '@angular/core';
import { UniformesModule } from './uniformes.module';
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

  productos!: productos[];

  caracteristicas_productos!: caracteristicas_productos[];
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

  deseleccionarOtrasTallas(opcion_caracteristica: Opciones_caracteristicas) {
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
    this.uniformesService.getCaracteristicas().subscribe((caracteristicas: caracteristicas_productos[]) => {
      this.caracteristicas_productos = caracteristicas;
      this.productos.map(producto => {
        producto.caracteristicas_productos = this.caracteristicas_productos.filter(caracteristica => caracteristica.id_producto === producto.id);

      })
      console.log(this.productos);
    });
    
  }


}
