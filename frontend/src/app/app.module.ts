import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PrimeIcons } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ValidadorModule } from './pages/validador/validador.module';
import { HomeModule } from './pages/home/home.module';
import { BarraMenuComponent } from './componentes/barra-menu/barra-menu.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';

@NgModule({
  declarations: [
    AppComponent,
    AuditoriaComponent,
  ],
  imports: [
    BarraMenuComponent,
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
