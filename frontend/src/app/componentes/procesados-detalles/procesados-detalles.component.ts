import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SuperPieComponent } from 'src/app/componentes/_grafica/super-pie/super-pie.component';
import { TableModule } from 'primeng/table';
import { PublicMethodsService } from 'src/app/shared/public-methods.service';
import { UrlService } from 'src/app/servicios/url/url.service';
import { TagModule } from 'primeng/tag';
import { elementos } from 'src/app/interfaces/elementos';
import { EstadisticasMethodsService } from 'src/app/shared/estadisticas/estadisticas-methods.service';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-procesados-detalles',
  templateUrl: './procesados-detalles.component.html',
  styleUrls: ['./procesados-detalles.component.css'],
  standalone: true,
  imports: [
    SuperPieComponent,
    TableModule,
    TagModule,
    CommonModule,
    DividerModule
  ],
})
export class ProcesadosDetallesComponent  implements OnInit {

  
  constructor(  
    public dialogConfig : DynamicDialogConfig,
    public publicMedhodsService: PublicMethodsService,
    public estadisticasMethods: EstadisticasMethodsService,
    private urlService: UrlService,) { }
 


    url_imagenes_procesadas: string = this.urlService.url_imagenes_procesadas;
    url_imagenes_referencia: string = this.urlService.url_imagenes_referencia;
    elemento?: elementos;
    procesados: procesados_imagenes[] = [];
    datos_graficas?: datos_graficas[];
 
    ngOnInit(): void {

      this.elemento = this.dialogConfig.data.elemento;
      this.procesados = this.elemento.procesados_imagenes;
      this.datos_graficas = this.dialogConfig.data.datos_graficas;
      
    }
  
  getSeverityCartel(procesado: string): string {
    return this.publicMedhodsService.getSeverityCartel(procesado);
  }

  getSeverityDispositivos(numero_dispositivos: number, huecos_esperados: number): string {
    return this.publicMedhodsService.getSeverityDispositivos(numero_dispositivos, huecos_esperados);
  }


}
