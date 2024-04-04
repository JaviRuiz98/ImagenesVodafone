 
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { productos } from 'src/app/interfaces/productos';
import { caracteristicas_productos } from 'src/app/interfaces/caracteristicas';
 
import { CommonModule } from '@angular/common';
import { SelectorImagenesComponent } from './../../componentes/selector-imagenes/selector-imagenes.component';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { DataViewModule } from 'primeng/dataview';
import { LocalStorageService } from 'src/app/servicios/local-storage/localStorage.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UniformesService } from 'src/app/servicios/uniformes/uniformes.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';




@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [ MessageService, ConfirmationService],
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    SelectorImagenesComponent, // sobra
    InputTextModule,
    SidebarModule,
    DataViewModule,
    InputNumberModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule
  ]
})



export class CarritoComponent implements OnInit{

  @Input() sidebarVisible: boolean = false; //sin implementar
  @Input() productos_carrito: productos[] = [];
 // productos_carrito: productos[] = [];
  
  @Output() mostrarCarrito = new EventEmitter<boolean>();
  // @Output() nuevoElementoCreado = new EventEmitter<elementos>();
  array_cantidad_valida: boolean[];
  url_imagenes_productos: string = 'http://validador-vf.topdigital.local/imagenes/imagenesProducto/';
 
  total_carrito: number = 0;

  verPedidoRealizado: boolean = false;
  id_tienda: number = 1;                                                //TO DO: obtener id desde las coockies del navegador 
 
  constructor( 
    private UniformesService: UniformesService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private localStorageService: LocalStorageService
  ) { }

 
  eliminarProducto(producto: productos){
    this.total_carrito -= (producto.precio * producto.cantidad);
    this.productos_carrito.splice(this.productos_carrito.indexOf(producto), 1);
    this.total_carrito = Math.round(this.total_carrito * 100) / 100; 
  }

  cambiarTotal(producto: productos){
    if(producto.cantidad > 0 && producto.cantidad <= producto.caracteristica_seleccionada.stock){

      this.array_cantidad_valida[this.productos_carrito.indexOf(producto)] = true;
    }else{
      this.array_cantidad_valida[this.productos_carrito.indexOf(producto)] = false;
      this.productos_carrito[this.productos_carrito.indexOf(producto)].cantidad = 1;
      producto.cantidad = 1;
    }


    this.calcularTotalCarrito();
    
  }

  // tramitarPedido(){
  //   this.
  // }
  

  ngOnInit(): void {
    this.calcularTotalCarrito();
    console.log('carrito', this.productos_carrito)
    this.array_cantidad_valida = new Array(this.productos_carrito.length).fill(true);
  }

  ngOnChanges() {
    this.calcularTotalCarrito();
  }

  calcularTotalCarrito(){
    this.total_carrito = 0;
    for (let i = 0; i < this.productos_carrito.length; i++) {
      this.total_carrito += this.productos_carrito[i].precio * this.productos_carrito[i].cantidad;
    }
    this.total_carrito = Math.round(this.total_carrito * 100) / 100; 
  }


  confirmaCompra(event){
    this.confirmationService.confirm({
      message: '¿Seguro que quieres confirmar la compra?',
      accept: () => {
        this.tramitarPedido();
 
      },
      reject: () => {
        this.messageService.add({severity:'info', summary: 'Rejected', detail: 'Tramitando pedido...'});
      }

    })
  }


  tramitarPedido(){
  
    this.UniformesService.tramitarPedido(this.productos_carrito, this.id_tienda).subscribe(
      (res: any)  => {
        if(res.message == 'ok'){
          this.productos_carrito.length = 0;
          this.total_carrito = 0;
          this.messageService.add({severity:'success', summary: 'Confirmado', detail: 'Tramitado con exito'});
          this.verPedidoRealizado = true
    
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al tramitar el pedido: stock'});
        }

    },
    error => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al tramitar el pedido'});
    //  this.mostrarCarrito.emit(false);
    }
    
    )
  }


}