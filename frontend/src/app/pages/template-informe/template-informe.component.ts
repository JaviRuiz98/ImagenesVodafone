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

@Component({
  selector: 'app-template-informe',
  templateUrl: './template-informe.component.html',
  styleUrls: ['./template-informe.component.css'],
  standalone: true,
  imports: [
    TableModule,
    ProgressBarModule,
    ChartModule,
    DataViewModule
  ],
})
export class TemplateInformeComponent implements OnInit {

  id_auditoria_cifrada: string = '';

  informeData = undefined;

  url_imagenes_procesadas: string = '';
  url_imagenes_referencia: string = '';

  resumen_auditoria: {
    concepto: string,
    detalle: string
  } []
  porcentaje_procesados: number;

  fecha: string = '';

  data: any;
  chartData = [0, 0, 0, 0]; //Cantidad de resultados por bueno, notable, medio y malo
  chartOptions: any;

  constructor(
    private informeService: InformeService,
    public publicMedhodsService: PublicMethodsService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private urlService: UrlService,
    private publicMethodsService: PublicMethodsService
  ) { }

  ngOnInit(): void {
    this.url_imagenes_procesadas = this.urlService.url_imagenes_procesadas;
    this.url_imagenes_referencia = this.urlService.url_imagenes_referencia;

    this.id_auditoria_cifrada = this.route.snapshot.paramMap.get('id_auditoria_cifrada');
    console.log('id_auditoria', this.id_auditoria_cifrada);

    this.informeService.getDatosInforme(this.id_auditoria_cifrada).subscribe(
      (data) => {
        this.informeData = data;
        console.log('data', data);
        

        this.informeData = this.informeData.map((element) => {
          element.procesados_imagenes.map ((procesado) => {
            procesado.fecha = this.publicMedhodsService.formatDate(procesado.fecha);
          })
        })

        console.log('informeData', this.informeData);

        this.mapearResumenAuditoria();

        this.generarDatosChart();
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
        detalle: this.informeData.num_expositores
      },
      {
        concepto: 'Total de elementos procesados',
        detalle: this.informeData.num_expositores_procesados
      }
    ]

    this.porcentaje_procesados = (this.informeData.num_expositores_procesados / this.informeData.num_expositores) * 100;
    this.porcentaje_procesados = parseFloat(this.porcentaje_procesados.toFixed(2));
    
    console.log(this.resumen_auditoria);
  }

  generarDatosChart() {
    for (const dato of this.informeData.datos_barra_progreso) {
      switch (dato) {
        case 1:
          this.chartData[0]++;
          break;
        case 2:
          this.chartData[1]++;
          break;
        case 3:
        case 4:
          this.chartData[2]++;
          break;
        default:
          this.chartData[3]++;
          break;
      }
    }

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      datasets: [
          {
              data: this.chartData,
              backgroundColor: [
                documentStyle.getPropertyValue('--green-500'),
                documentStyle.getPropertyValue('--yellow-500'),
                documentStyle.getPropertyValue('--orange-500'),
                documentStyle.getPropertyValue('--red-500'),
              ],
              label: 'My dataset'
          }
      ],
      labels: ['Positivo', 'Notable', 'Medio', 'Negativo']
  };
  
  this.chartOptions = {
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          r: {
              grid: {
                  color: surfaceBorder
              }
          }
      }
  };
  }

}
