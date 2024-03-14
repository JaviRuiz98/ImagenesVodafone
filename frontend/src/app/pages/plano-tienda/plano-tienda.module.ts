import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PlanoTiendaComponent } from './plano-tienda.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AgregarMuebleATiendaComponent } from 'src/app/componentes/agregar-mueble-a-tienda/agregar-mueble-a-tienda.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';



@NgModule({
  declarations: [
    PlanoTiendaComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    ToastModule,
    OverlayPanelModule,
    AgregarMuebleATiendaComponent,
    ScrollPanelModule
  ],
  providers: [
    MessageService
  ],
})
export class PlanoTiendaModule { }
