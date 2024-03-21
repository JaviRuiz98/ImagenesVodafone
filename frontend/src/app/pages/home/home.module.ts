import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { BarraMenuComponent } from 'src/app/componentes/barra-menu/barra-menu.component';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { BotonMenuComponent } from 'src/app/componentes/botonMenu/botonMenu.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    SharedModule,
    BarraMenuComponent,
    ButtonModule,
    PanelModule,
    BotonMenuComponent
  ]
})
export class HomeModule { }
