import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService } from 'primeng/api';

import { ReactiveFormsModule } from '@angular/forms' //para formularios de creación y edición de muebles
import { FormsModule } from '@angular/forms'; //select button


import { MuebleComponent } from './mueble.component';
import { IrArribaComponent } from 'src/app/componentes/ir-arriba/ir-arriba.component';

import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { FormMuebleComponent } from './components/formMueble/formMueble.component';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';


@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ImageModule,
    SelectButtonModule,
    ToastModule,
    ButtonModule,
    ToolbarModule,
    ProgressSpinnerModule,
    DynamicDialogModule,
    PanelModule,


    ReactiveFormsModule,
    FormsModule,

    IrArribaComponent,
    
  ],
  declarations: [MuebleComponent, FormMuebleComponent], 
  providers: [MessageService, DialogService],
})
export class MuebleModule { }
