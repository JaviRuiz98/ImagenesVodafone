import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

@NgModule({
  declarations: [
    TiendasComponent
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
  ]
})
export class TiendasModule { }
