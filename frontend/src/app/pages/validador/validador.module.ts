import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidadorComponent } from './validador.component';

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
 

// componentes nuestros
import { BarraMenuComponent } from './../../componentes/barra-menu/barra-menu.component';
import { MarcoElementoComponent } from './../../componentes/marco-elemento/marco-elemento.component';
import { SelectorImagenesComponent } from './../../componentes/selector-imagenes/selector-imagenes.component';
import { PaginadorProcesamientoSubidaComponent } from './../../componentes/paginador-procesamiento-subida/paginador-procesamiento-subida.component'; 

@NgModule({
  declarations: [
    ValidadorComponent
  ],
  imports: [
    CommonModule,

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
    ToastModule
  ]
})
export class ValidadorModule { }
