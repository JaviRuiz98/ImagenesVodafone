import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpositoresComponent } from './expositores.component';

import { SidebarComponent } from '../../componentes/sidebar/sidebar.component';




// modulos primeng:
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ImageModule } from 'primeng/image';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
 

// componentes nuestros
import { BarraMenuComponent } from './../../componentes/barra-menu/barra-menu.component';
import { MarcoElementoComponent } from './../../componentes/marco-elemento/marco-elemento.component';
import { SelectorImagenesComponent } from './../../componentes/selector-imagenes/selector-imagenes.component';
import { PaginadorProcesamientoSubidaComponent } from './../../componentes/paginador-procesamiento-subida/paginador-procesamiento-subida.component'; 



@NgModule({
  declarations: [
    ExpositoresComponent
  ],
  imports: [
    CommonModule,
    SidebarComponent,
    PaginadorProcesamientoSubidaComponent,
    SelectorImagenesComponent,
    BarraMenuComponent,
    MarcoElementoComponent,


    BrowserAnimationsModule,    
    CardModule,
    DividerModule,
    PanelModule,
    TagModule,
    BadgeModule, 
    ImageModule,
    ProgressSpinnerModule,
    ToastModule,
    TableModule
]
})


export class ExpositorModule { }