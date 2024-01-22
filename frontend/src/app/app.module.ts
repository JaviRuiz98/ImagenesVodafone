import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



// modulos primeng:

import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { PrimeIcons } from 'primeng/api';


//instancias del programa
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ValidadorComponent } from './pages/validador/validador.component';
import { BarraMenuComponent } from './componentes/barra-menu/barra-menu.component';
import { MarcoElementoComponent } from './componentes/marco-elemento/marco-elemento.component';
import { SelectorImagenesComponent } from './componentes/selector-imagenes/selector-imagenes.component';
import { PaginadorProcesamientoSubidaComponent } from './componentes/paginador-procesamiento-subida/paginador-procesamiento-subida.component';



@NgModule({
  declarations: [
    AppComponent,
    ValidadorComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CardModule,
    DividerModule,
    PanelModule,
    HttpClientModule,
    TagModule,
    BadgeModule,

    PaginadorProcesamientoSubidaComponent,
    SelectorImagenesComponent,
    BarraMenuComponent,
    MarcoElementoComponent,

  ],
  providers: [   
    PrimeIcons,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
