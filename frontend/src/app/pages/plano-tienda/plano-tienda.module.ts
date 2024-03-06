import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PlanoTiendaComponent } from './plano-tienda.component';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [
    PlanoTiendaComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ToolbarModule,
    DialogModule
  ]
})
export class PlanoTiendaModule { }
