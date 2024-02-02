import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PrimeIcons } from 'primeng/api';

//instancias del programa
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ValidadorModule } from './pages/validador/validador.module';
import { HomeModule } from './pages/home/home.module';
import { CargarAuditoriaComponent } from './pages/cargar-auditoria/cargar-auditoria.component';

@NgModule({
  declarations: [
    AppComponent,
    CargarAuditoriaComponent,
  ],
  imports: [
    ValidadorModule,
    AppRoutingModule,
    HomeModule,
    BrowserModule,
    HttpClientModule   
  ],
  providers: [   
    PrimeIcons,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
