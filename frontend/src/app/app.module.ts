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
import { ImageModule } from 'primeng/image';

//instancias del programa
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidadorComponent } from './pages/validador/validador.component';
import { BarraMenuComponent } from './componentes/barra-menu/barra-menu.component';
import { MarcoElementoComponent } from './componentes/marco-elemento/marco-elemento.component';
import { SelectorImagenesComponent } from './componentes/selector-imagenes/selector-imagenes.component';
import { HttpClientModule } from '@angular/common/http';

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
    SelectorImagenesComponent,
    ImageModule,
    BarraMenuComponent,
    MarcoElementoComponent,
    TagModule,
    BadgeModule
  ],
  providers: [   
    PrimeIcons,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
