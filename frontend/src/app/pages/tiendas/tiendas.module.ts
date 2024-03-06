import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TiendasComponent } from './tiendas.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { PickListModule } from 'primeng/picklist';
import { TableModule } from 'primeng/table';
import { OrderListModule } from 'primeng/orderlist';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DialogNuevaTiendaComponent } from './component/dialog-nueva-tienda/dialog-nueva-tienda.component';
import { DialogService } from 'primeng/dynamicdialog';
import { EditarTiendaComponent } from './component/editar-tienda/editar-tienda.component';
import { AgregarMuebleATiendaComponent } from 'src/app/componentes/agregar-mueble-a-tienda/agregar-mueble-a-tienda.component';
@NgModule({
  declarations: [
    TiendasComponent,
    DialogNuevaTiendaComponent,
    EditarTiendaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    InputTextModule,
    StepsModule,
    PickListModule,
    TableModule,
    OrderListModule,
    ToggleButtonModule,
    AgregarMuebleATiendaComponent
  ],
  providers: [MessageService, DialogService],

})
export class TiendasModule { }
