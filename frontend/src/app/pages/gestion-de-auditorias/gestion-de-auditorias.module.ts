import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionDeAuditoriasComponent } from './gestion-de-auditorias.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ItemListaAuditoriaComponent } from 'src/app/componentes/item-lista-auditoria/item-lista-auditoria.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BarraDeBarrasComponent } from 'src/app/componentes/barra-de-barras/barra-de-barras.component';

@NgModule({
  declarations: [
    GestionDeAuditoriasComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    ItemListaAuditoriaComponent,
    ToastModule,
    ToolbarModule,
    TableModule,
    TagModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    BarraDeBarrasComponent
  ], 
  providers: [
    ConfirmationService,
    MessageService
  ],
})
export class GestionDeAuditoriasModule { }
