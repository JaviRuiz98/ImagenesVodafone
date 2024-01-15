import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidadorComponent } from './pages/validador/validador.component';
import { ElementoSimpleComponent } from './componentes/elemento-simple/elemento-simple.component';
import { ElementoDobleComponent } from './componentes/elemento-doble/elemento-doble.component';

@NgModule({
  declarations: [
    AppComponent,
    ValidadorComponent,
    ElementoSimpleComponent,
    ElementoDobleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
