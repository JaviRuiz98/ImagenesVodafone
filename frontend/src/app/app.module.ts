import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PrimeIcons } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ValidadorModule } from './pages/validador/validador.module';
import { HomeModule } from './pages/home/home.module';
import { BarraMenuComponent } from './componentes/barra-menu/barra-menu.component';
import { TiendasModule } from './pages/tiendas/tiendas.module';
import { MuebleModule } from './pages/mueble/mueble.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BarraMenuComponent,
    MuebleModule,
    ValidadorModule,
    AppRoutingModule,
    HomeModule,
    TiendasModule,
    BrowserModule,
    HttpClientModule   
  ],
  providers: [   
    PrimeIcons,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
