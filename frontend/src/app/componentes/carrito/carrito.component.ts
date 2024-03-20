 
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

  ]
})



export class CarritoComponent implements OnInit{

  @Input() sidebarVisible: boolean = false; //sin implementar
  @Input() productos_carrito: productos[] = [] as productos[];
   
  @Output() mostrarDialogoNuevoElemento = new EventEmitter<boolean>();
  // @Output() nuevoElementoCreado = new EventEmitter<elementos>();
 
  url_imagenes_productos: string = 'http://validador-vf.topdigital.local/imagenes/imagenesProducto/';
 

  constructor( private messageService: MessageService, private confirmationService: ConfirmationService) { }

 
  eliminarProducto(producto: productos){
    this.productos_carrito.splice(this.productos_carrito.indexOf(producto), 1);
  }
  

  ngOnInit(): void {
 
  }






}
