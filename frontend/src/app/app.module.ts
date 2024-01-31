import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PrimeIcons } from 'primeng/api';

//instancias del programa
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ValidadorModule } from './pages/validador/validador.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ValidadorModule,
    AppRoutingModule,

    BrowserModule,
    HttpClientModule   
  ],
  providers: [   
    PrimeIcons,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
