import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { InformeService } from 'src/app/servicios/informe/informe.service';
import { PublicMethodsService } from 'src/app/shared/public-methods.service';
import { LocalStorageService } from 'src/app/servicios/local-storage/localStorage.service';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { UrlService } from 'src/app/servicios/url/url.service';
import { datos_informe } from 'src/app/interfaces/datos_informe';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { datos_graficas } from 'src/app/interfaces/datos_graficas';
import { SuperPieComponent } from 'src/app/componentes/super-pie/super-pie.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-template-informe',
  templateUrl: './template-informe.component.html',
  styleUrls: ['./template-informe.component.css'],
  standalone: true,
  imports: [
    TableModule,
    ProgressBarModule,
    ChartModule,
    TagModule,
    CommonModule,
    SuperPieComponent
  ],
})
export class TemplateInformeComponent implements OnInit {

  id_auditoria_cifrada: string = '';

  informeData: datos_informe;

  url_imagenes_procesadas: string = '';
  url_imagenes_referencia: string = '';

  resumen_auditoria: {
    concepto: string,
    detalle: string
  } []
  porcentaje_procesados: number;

  fecha: string = '';

  datos_graficas: datos_graficas[] = [
    {
      etiqueta: 'Positivo',
      valor: 0,
      color: 'green'
    },
    {
      etiqueta: 'Notable',
      valor: 0,
      color: 'yellow'
    },
    {
      etiqueta: 'Medio',
      valor: 0,
      color: 'orange'
    },
    {
      etiqueta: 'Negativo',
      valor: 0,
      color: 'red'
    },
    {
      etiqueta: 'No procesados',
      valor: 0,
      color: 'bluegray'
    }
  ];

  constructor(
    private informeService: InformeService,
    public publicMedhodsService: PublicMethodsService,
    private route: ActivatedRoute,
    private urlService: UrlService,
  ) { }

  ngOnInit(): void {
    this.url_imagenes_procesadas = this.urlService.url_imagenes_procesadas;
    this.url_imagenes_referencia = this.urlService.url_imagenes_referencia;

    this.id_auditoria_cifrada = this.route.snapshot.paramMap.get('id_auditoria_cifrada');
    console.log('id_auditoria', this.id_auditoria_cifrada);

    this.informeService.getDatosInforme(this.id_auditoria_cifrada).subscribe(
      (data) => {
        this.informeData = data;
        console.log('informeData', this.informeData);

        this.mapearResumenAuditoria();

        this.datos_graficas = this.generarDatosChart(this.datos_graficas);
      },
      (error) => {
        console.error(error);
      }
    )
  }

  mapearResumenAuditoria() {
    this.resumen_auditoria = [
      {
        concepto: 'Tienda',
        detalle: this.informeData.tiendas.sfid
      },
      {
        concepto: 'Inicio auditoría',
        detalle: this.publicMedhodsService.formatDate(this.informeData.fecha)
      },
      {
        concepto: 'Fin auditoría',
        detalle: this.publicMedhodsService.formatDate(this.informeData.fecha_fin)
      },
      {
        concepto: 'Total de elementos a procesar',
        detalle: String(this.informeData.num_expositores)
      },
      {
        concepto: 'Total de elementos procesados',
        detalle: String(this.informeData.num_expositores_procesados)
      }
    ]

    this.porcentaje_procesados = (this.informeData.num_expositores_procesados / this.informeData.num_expositores) * 100;
    this.porcentaje_procesados = parseFloat(this.porcentaje_procesados.toFixed(2));
    
  }

  getSeverityCartel(procesado: string): string {
    return this.publicMedhodsService.getSeverityCartel(procesado);
  }

  getSeverityDispositivos(numero_dispositivos: number, huecos_esperados: number): string {
    return this.publicMedhodsService.getSeverityDispositivos(numero_dispositivos, huecos_esperados);
  }

  generarDatosChart(datos_graficas: datos_graficas[]) {
    console.log('datos_grafica', datos_graficas);
    for (const dato of this.informeData.datos_barra_progreso) {
      switch (dato) {
        case 0:
          datos_graficas[4].valor++;
          break;
        case 1:
          datos_graficas[0].valor++;
          break;
        case 2:
          datos_graficas[1].valor++;
          break;
        case 3:
        case 4:
          datos_graficas[2].valor++;
          break;
        default:
          datos_graficas[3].valor++;
          break;
      }
    }
    console.log('datos_grafica', datos_graficas);

    return [...datos_graficas];
  }
}
