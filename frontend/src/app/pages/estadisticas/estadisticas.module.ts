import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasComponent } from './estadisticas.component';
import { MenubarModule } from 'primeng/menubar';


@NgModule({
  declarations: [
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    MenubarModule
  ]
})
export class EstadisticasModule { }
