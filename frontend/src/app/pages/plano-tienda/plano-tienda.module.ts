import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PlanoTiendaComponent } from './plano-tienda.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    PlanoTiendaComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
})
export class PlanoTiendaModule { }
