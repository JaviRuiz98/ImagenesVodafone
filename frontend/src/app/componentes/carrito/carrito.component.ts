 
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { productos } from 'src/app/interfaces/productos';
import { caracteristicas_productos } from 'src/app/interfaces/caracteristicas';
import { Carrito } from 'src/app/interfaces/carrito';

import { SelectorImagenesComponent } from './../../componentes/selector-imagenes/selector-imagenes.component';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { DataViewModule } from 'primeng/dataview';
import { LocalStorageService } from 'src/app/servicios/local-storage/localStorage.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [ MessageService, ConfirmationService],
  standalone: true,
  imports: [
    DialogModule,
    SelectorImagenesComponent,
    InputTextModule,
    SidebarModule,
    DataViewModule,
    InputNumberModule,
    FormsModule
  ]
})



export class CarritoComponent implements OnInit{

  @Input() sidebarVisible: boolean = false; //sin implementar
  //@Input() productos_carrito: productos[] = [];
  productos_carrito: productos[] = [];
   
  @Output() mostrarDialogoNuevoElemento = new EventEmitter<boolean>();
  // @Output() nuevoElementoCreado = new EventEmitter<elementos>();
 
  url_imagenes_productos: string = 'http://validador-vf.topdigital.local/imagenes/imagenesProducto/';
 
  total_carrito: number = 0;

  constructor( 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private localStorageService: LocalStorageService
  ) { }

 
  eliminarProducto(producto: productos){
    this.productos_carrito.splice(this.productos_carrito.indexOf(producto), 1);
  }
  

  ngOnInit(): void {
    this.productos_carrito = this.localStorageService.getItem('carrito');
    this.calcularTotalCarrito();

    console.log('carrito', this.productos_carrito)
  }

  ngOnChanges() {
    this.calcularTotalCarrito();
  }

  calcularTotalCarrito(){
    this.total_carrito = 0;
    for (let i = 0; i < this.productos_carrito.length; i++) {
      this.total_carrito += this.productos_carrito[i].precio * this.productos_carrito[i].cantidad;
    }
  }


}
