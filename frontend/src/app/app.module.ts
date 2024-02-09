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
import { MuebleModule } from './pages/mueble/mueble.module';
import { GestionDeAuditoriasModule } from './pages/gestion-de-auditorias/gestion-de-auditorias.module';
import { AuditoriaModule } from './pages/auditoria/auditoria.module';
import { DatePipe } from '@angular/common';


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
    BrowserModule,
    HttpClientModule,
    GestionDeAuditoriasModule,
    AuditoriaModule
  ],
  providers: [   
    PrimeIcons,
    DatePipe
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
