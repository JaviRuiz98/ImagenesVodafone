import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasComponent } from './estadisticas.component';
import { MenubarModule } from 'primeng/menubar';
import { EstadisticasAuditoriaComponent } from './estadisticas-auditoria/estadisticas-auditoria.component';
import { EstadisticasTiendasComponent } from './estadisticas-tiendas/estadisticas-tiendas.component';
import { EstadisticasMueblesComponent } from './estadisticas-muebles/estadisticas-muebles.component';
import { EstadisticasElementosComponent } from './estadisticas-elementos/estadisticas-elementos.component';
import { EstadisticasIaComponent } from './estadisticas-ia/estadisticas-ia.component';
import { EstadisticasUniformesComponent } from './estadisticas-uniformes/estadisticas-uniformes.component';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    EstadisticasComponent,
    EstadisticasAuditoriaComponent,
    EstadisticasTiendasComponent,
    EstadisticasMueblesComponent,
    EstadisticasElementosComponent,
    EstadisticasIaComponent,
    EstadisticasUniformesComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    ChartModule
  ]
})
export class EstadisticasModule { }
