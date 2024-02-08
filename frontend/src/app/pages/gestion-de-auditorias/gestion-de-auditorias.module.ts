import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionDeAuditoriasComponent } from './gestion-de-auditorias.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ItemListaAuditoriaComponent } from 'src/app/componentes/item-lista-auditoria/item-lista-auditoria.component';


@NgModule({
  declarations: [
    GestionDeAuditoriasComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    ItemListaAuditoriaComponent
  ]
})
export class GestionDeAuditoriasModule { }
