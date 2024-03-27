import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasComponent } from './estadisticas.component';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { EstadisticasAuditoriaComponent } from './estadisticas-auditoria/estadisticas-auditoria.component';
import { EstadisticasTiendasComponent } from './estadisticas-tiendas/estadisticas-tiendas.component';
import { EstadisticasMueblesComponent } from './estadisticas-muebles/estadisticas-muebles.component';
import { EstadisticasElementosComponent } from './estadisticas-elementos/estadisticas-elementos.component';
import { EstadisticasIaComponent } from './estadisticas-ia/estadisticas-ia.component';
import { EstadisticasUniformesComponent } from './estadisticas-uniformes/estadisticas-uniformes.component';
import { SuperPieComponent } from 'src/app/componentes/_grafica/super-pie/super-pie.component';
import { SuperLineChartComponent } from 'src/app/componentes/_grafica/super-line-chart/super-line-chart.component';
import { BarraMultiusoComponent } from 'src/app/componentes/_grafica/barra-multiuso/barra-multiuso.component';
import { SuperDonutComponent } from 'src/app/componentes/_grafica/super-donut/super-donut.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';


//uniformes
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    EstadisticasComponent,
    EstadisticasAuditoriaComponent,
    EstadisticasTiendasComponent,
    EstadisticasMueblesComponent,
    EstadisticasElementosComponent,
    EstadisticasIaComponent,
    EstadisticasUniformesComponent,
   
  ],
  imports: [
    CommonModule,
    MenubarModule,
    SuperPieComponent,
    SuperLineChartComponent,
    BarraMultiusoComponent,
    DividerModule,
    SuperDonutComponent,
    DividerModule,
    ProgressBarModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    CardModule,
    ChartModule
  ]
})
export class EstadisticasModule { }
