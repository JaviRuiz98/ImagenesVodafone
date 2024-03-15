import { Component, OnInit } from '@angular/core';
import { UniformesModule } from './uniformes.module';
import { productos } from 'src/app/interfaces/productos';
import { UniformesService } from 'src/app/servicios/uniformes/uniformes.service';
import { Opciones_caracteristicas } from 'src/app/interfaces/caracteristicas';
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

  // formulario!: FormGroup;

  layout: any = 'list';

  productos!: productos[];
  opciones_caracteristicas!: Opciones_caracteristicas[];
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
    
  }

  deseleccionarOtrasTallas(opcion_caracteristica: Opciones_caracteristicas) {
    const index = this.productos.findIndex(item => item.id === opcion_caracteristica.id_producto);

    this.productos[index].opciones_caracteristicas.forEach(item => {
      if (item.id !== opcion_caracteristica.id) {
          item.seleccionado = false;
      }else{
        item.seleccionado = !item.seleccionado;
      }
    });
}

  ngOnInit() {
    this.inicializaProductos();
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

      })
      console.log(this.productos);
    });
    
  }


}
