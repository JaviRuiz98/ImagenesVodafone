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
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { GestionDePedidosComponent } from 'src/app/componentes/gestion-de-pedidos/gestion-de-pedidos.component';

import { ProcesadosDetallesComponent } from 'src/app/componentes/procesados-detalles/procesados-detalles.component';
import { StackedBarComponent } from 'src/app/componentes/_grafica/stacked-bar/stacked-bar.component';
import { MultipleSelectorElementosComponent } from 'src/app/componentes/multipleSelectorElementos/multipleSelectorElementos.component';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';

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
    TableModule,
    ProgressSpinnerModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    CardModule,
    ChartModule,
    PanelModule,
    OverlayPanelModule,
    DropdownModule,
    TableModule,
    TagModule,
    GestionDePedidosComponent,
    ChartModule,
    SelectButtonModule,
    OverlayPanelModule,
    ProcesadosDetallesComponent,
    MultipleSelectorElementosComponent,
    DialogModule,
    SkeletonModule,

    DynamicDialogModule,
    StackedBarComponent
  ]
})
export class EstadisticasModule { }
