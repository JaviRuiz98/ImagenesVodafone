 
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
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
//
import { tienda } from 'src/app/interfaces/tienda';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { pedidos } from 'src/app/interfaces/pedidos';
import { carrito } from 'src/app/interfaces/carrito';
import { UniformesComponent } from 'src/app/pages/uniformes/uniformes.component'; 
@Component({
  selector: 'app-gestion-de-pedidos',
  templateUrl: './gestion-de-pedidos.component.html',
  styleUrls: ['./gestion-de-pedidos.component.css'],
  providers: [ MessageService, ConfirmationService],
  standalone: true,
  imports: [
    CommonModule,
    DialogModule, 
    InputTextModule,
    SidebarModule,
    DataViewModule,
    InputNumberModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    PanelModule,
    TableModule,
    DropdownModule,
    TagModule
  ]
})





export class GestionDePedidosComponent implements OnInit{


  loading: boolean = true;  
  statuses!: any[];
  selectedPedidos: pedidos = {
    id: 0, 
    id_tienda: 0,
    fecha: new Date(),
    fecha_entrega: null,
    sfid: ''
  }
  pedidosTodos: pedidos[] = [];
  tiendasTodas: tienda[] = [];


  constructor(private uniformesService: UniformesService, private tiendasService: TiendasService){}


  inicializaPedidos(){

    this.tiendasService.getAllTiendas().subscribe((tiendas) => {
      this.tiendasTodas = tiendas;
   

      this.uniformesService.getPedidos().subscribe((pedidos) => {
        this.pedidosTodos = pedidos;

        this.pedidosTodos.forEach((pedido) => {
          pedido.sfid = this.tiendasTodas.find((tienda) => tienda.id === pedido.id_tienda)?.sfid
        })

        this.loading = false;
      })
    })
  }



  ngOnInit(): void {
    this.inicializaPedidos();


    this.statuses = [
      { label: 'Unqualified', value: 'Entregado' }, //success
      { label: 'Qualified', value: 'En tramite' },  //info
      { label: 'New', value: 'Enviado' }, //warning
      { label: 'Negotiation', value: 'Espera de pago' }, //danger
      // { label: 'Renewal', value: 'renewal' },
      // { label: 'Proposal', value: 'proposal' }
   ];

  }


  

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string) {
    switch (status) {
        case 'Entregado':
            return 'success';

        case 'En tramite':
            return 'info';

        case 'Enviado':
            return 'warning';

        case 'Espera de pago':
          return 'danger';

        case 'renewal':
            return null;
        default:
            return null;
    }
  }




}
