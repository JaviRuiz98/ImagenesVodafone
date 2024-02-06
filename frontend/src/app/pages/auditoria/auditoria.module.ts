import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditoriaComponent } from './auditoria.component';

import { SidebarComponent } from '../../componentes/sidebar/sidebar.component';

import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ImageModule } from 'primeng/image';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

 
import { BarraMenuComponent } from './../../componentes/barra-menu/barra-menu.component';
import { MarcoElementoComponent } from './../../componentes/marco-elemento/marco-elemento.component';
import { SelectorImagenesComponent } from './../../componentes/selector-imagenes/selector-imagenes.component';
import { PaginadorProcesamientoSubidaComponent } from './../../componentes/paginador-procesamiento-subida/paginador-procesamiento-subida.component'; 
import { IrArribaComponent } from 'src/app/componentes/ir-arriba/ir-arriba.component';import { FiltroProcesadosComponent } from 'src/app/componentes/filtro-procesados/filtro-procesados.component';

@NgModule({
  declarations: [
    AuditoriaComponent
  ],
  imports: [
    CommonModule,
    SidebarComponent,
    PaginadorProcesamientoSubidaComponent,
    SelectorImagenesComponent,
    BarraMenuComponent,
    MarcoElementoComponent,
    IrArribaComponent,
    FiltroProcesadosComponent,

    BrowserAnimationsModule,    
    CardModule,
    DividerModule,
    PanelModule,
    TagModule,
    BadgeModule, 
    ImageModule,
    ProgressSpinnerModule,
    ToastModule
  ]
})
export class NuevaAuditoriaModule { }