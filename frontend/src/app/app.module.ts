import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



// modulos primeng:

import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 

//instancias del programa
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidadorComponent } from './pages/validador/validador.component';
import { ElementoSimpleComponent } from './componentes/elemento-simple/elemento-simple.component';
import { ElementoDobleComponent } from './componentes/elemento-doble/elemento-doble.component';
import { BarraMenuComponent } from './componentes/barra-menu/barra-menu.component';
import { MarcoElementoComponent } from './componentes/marco-elemento/marco-elemento.component';



@NgModule({
  declarations: [
    AppComponent,
    ValidadorComponent,
    ElementoSimpleComponent,
    ElementoDobleComponent,
    BarraMenuComponent,
    MarcoElementoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CardModule,
    DividerModule,
    PanelModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
