import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService } from 'primeng/api';

import { ReactiveFormsModule } from '@angular/forms' //para formularios de creación y edición de muebles
import { FormsModule } from '@angular/forms'; //select button


import { MuebleComponent } from './mueble.component';

import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ImageModule,
    SelectButtonModule,
    ToastModule,

    ReactiveFormsModule,
    FormsModule
    
  ],
  declarations: [MuebleComponent], 
  providers: [MessageService]
})
export class MuebleModule { }
