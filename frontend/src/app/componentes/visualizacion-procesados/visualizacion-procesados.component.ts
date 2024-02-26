import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogInformacionProcesadoComponent } from '../dialog-informacion-procesado/dialog-informacion-procesado.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ImageModule } from 'primeng/image';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProcesamientoService } from 'src/app/servicios/procesamiento-imagenes/procesamiento-services.service';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-visualizacion-procesados',
  templateUrl: './visualizacion-procesados.component.html',
  styleUrls: ['./visualizacion-procesados.component.css'],
  standalone: true,
  imports: [
    DialogInformacionProcesadoComponent,
    ToastModule,
    ConfirmDialogModule,
    ImageModule,
    PaginatorModule,
    DialogModule,
    CommonModule,
    GalleriaModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
  ]
})
export class VisualizacionProcesadosComponent implements OnInit{

  @Input() procesados: procesados_imagenes[] = [];

  url_imagenes_procesadas: string = 'http://validador-vf.topdigital.local/imagenes/imagenesProcesamiento/';
  items_per_page: number = 1;
  indice_paginador: number = 0;
  visiblePrompt: boolean = false;

  verInformacionProcesado: boolean = false;
  imagenProcesadaSelected: procesados_imagenes = undefined;
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  constructor(
    private confirmationService: ConfirmationService,
    private procesamientoService: ProcesamientoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
  }
  getElementosPaginados(): procesados_imagenes[] | undefined {
    return this.procesados.slice(this.indice_paginador, this.indice_paginador + this.items_per_page);
  }

  showDialog() {
    this.visiblePrompt = true;
  }

  onPageChange(event: any) {
    this.indice_paginador = event.first;
  }

  mostrarInformacion(procesado: procesados_imagenes){
    this.verInformacionProcesado = true;
    this.imagenProcesadaSelected = procesado;
  }
}
