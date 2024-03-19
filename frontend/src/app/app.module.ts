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
import { GestionDeAuditoriasModule } from './pages/gestion-de-auditorias/gestion-de-auditorias.module';
import { AuditoriaModule } from './pages/auditoria/auditoria.module';
import { DatePipe } from '@angular/common';
import { ElementosModule } from './pages/elementos/elementos.modules';
import { RemarcarExpositorComponent } from './componentes/remarcar-expositor/remarcar-expositor.component';
import { PlanoTiendaModule } from './pages/plano-tienda/plano-tienda.module';
import { LoginModule } from './pages/login/login.module';
import { UniformesModule } from './pages/uniformes/uniformes.module';  
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BarraMenuComponent,
    RemarcarExpositorComponent,
    MuebleModule,
    ValidadorModule,
    AppRoutingModule,
    HomeModule,
    TiendasModule,
    BrowserModule,
    HttpClientModule,
    GestionDeAuditoriasModule,
    AuditoriaModule,    
    ElementosModule,
    PlanoTiendaModule,
    ElementosModule,
    LoginModule,
    UniformesModule,
    ButtonModule
  ],
  providers: [   
    PrimeIcons,
    DatePipe, 
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
