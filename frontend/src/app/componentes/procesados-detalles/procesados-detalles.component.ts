import { Component, Input, OnInit } from '@angular/core';
import { SuperPieComponent } from 'src/app/componentes/_grafica/super-pie/super-pie.component';
import { TableModule } from 'primeng/table';
import { PublicMethodsService } from 'src/app/shared/public-methods.service';
import { UrlService } from 'src/app/servicios/url/url.service';
import { TagModule } from 'primeng/tag';
import { elementos } from 'src/app/interfaces/elementos';
import { EstadisticasMethodsService } from 'src/app/shared/estadisticas/estadisticas-methods.service';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';

@Component({
  selector: 'app-procesados-detalles',
  templateUrl: './procesados-detalles.component.html',
  styleUrls: ['./procesados-detalles.component.css'],
  standalone: true,
  imports: [
    SuperPieComponent,
    TableModule,
    TagModule
  ],
})
export class ProcesadosDetallesComponent {

  
  constructor(    public publicMedhodsService: PublicMethodsService,
    public estadisticasMethods: EstadisticasMethodsService,
    private urlService: UrlService,) { }

    url_imagenes_procesadas: string = this.urlService.url_imagenes_procesadas;
    url_imagenes_referencia: string = this.urlService.url_imagenes_referencia;
    @Input() elementoProcesados: elementos;
    @Input () datos_graficas: datos_graficas[];
 
 
  
  getSeverityCartel(procesado: string): string {
    return this.publicMedhodsService.getSeverityCartel(procesado);
  }

  getSeverityDispositivos(numero_dispositivos: number, huecos_esperados: number): string {
    return this.publicMedhodsService.getSeverityDispositivos(numero_dispositivos, huecos_esperados);
  }


}
