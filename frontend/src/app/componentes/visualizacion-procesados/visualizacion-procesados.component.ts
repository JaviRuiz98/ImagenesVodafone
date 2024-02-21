import { Component, Input } from '@angular/core';
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
    CommonModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class VisualizacionProcesadosComponent {

  @Input() procesados: procesados_imagenes[] = [];

  url_imagenes_procesadas: string = 'http://validador-vf.topdigital.local/imagenes/imagenesProcesamiento/';

  items_per_page: number = 1;
  indice_paginador: number = 0;

  visiblePrompt: boolean = false;
  LikeDislike: number =-1;

  likeButton: string = "pi pi-thumbs-up";
  dislikeButton: string = "pi pi-thumbs-down";

  constructor(
    private confirmationService: ConfirmationService,
    private procesamientoService: ProcesamientoService,
    private messageService: MessageService
  ) {}

  getElementosPaginados(): procesados_imagenes[] | undefined {
    console.log("procesados",this.procesados.slice(this.indice_paginador, this.indice_paginador + this.items_per_page))
    return this.procesados.slice(this.indice_paginador, this.indice_paginador + this.items_per_page);
  }

  showDialog() {
    this.visiblePrompt = true;
  }

  onPageChange(event: any) {
    this.indice_paginador = event.first;
  }

  confirmarDelete(event: Event, procesado: procesados_imagenes) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Estas seguro de eliminar este procesado?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            this.borrarProcesado(procesado);
        },
        reject: () => {
           this.messageService.add({ severity: 'error', summary: 'Proceso cancelado', detail: '', life: 3000 });
        }
    });
  }


  borrarProcesado(procesado: procesados_imagenes){
      this.procesamientoService.deleteProcesado(procesado).subscribe(
          (response) => {
              this.procesados.splice(this.procesados.indexOf(procesado), 1);
              this.messageService.add({ severity: 'info', life: 3000,summary: 'Cargando', detail: 'La imagen se borro correctamente' });
          }, (error) => {
              console.log('error', error);
              this.messageService.add({ severity: 'error', life: 3000, summary: 'Error', detail: 'No se pudo borrar la imagen' });
          }
      );
      
  }

  funcionFeedback(procesado: procesados_imagenes, likeDislike: boolean | null) {
    if(procesado.feedback_humano == null){
        procesado.feedback_humano = likeDislike;
    } else {
        if(procesado.feedback_humano == likeDislike){
            procesado.feedback_humano = null;
        } else {
            procesado.feedback_humano = likeDislike;
        }
    }
    if(procesado.feedback_humano == true){
        this.likeButton = "pi pi-thumbs-up-fill";
        this.dislikeButton = "pi pi-thumbs-down";
    } else if(procesado.feedback_humano == false){
        this.likeButton = "pi pi-thumbs-up";
        this.dislikeButton = "pi pi-thumbs-down-fill";
    } else if(procesado.feedback_humano == null){
        this.likeButton = "pi pi-thumbs-up";
        this.dislikeButton = "pi pi-thumbs-down";
    }
    this.procesamientoService.updateFeedbackProcesado(procesado.id_procesado_imagen, procesado.feedback_humano).subscribe();
  }

  inicializa_likeButon(procesado: procesados_imagenes){
    if(procesado.feedback_humano == true){
        this.likeButton = "pi pi-thumbs-up-fill";
    } else if(procesado.feedback_humano == false){
        this.likeButton = "pi pi-thumbs-up";
    } else if(procesado.feedback_humano == null){
        this.likeButton = "pi pi-thumbs-up";
    }
    return this.likeButton;
  }

  inicializa_dislikeButon(procesado: procesados_imagenes){
      if(procesado.feedback_humano == true){
          this.dislikeButton = "pi pi-thumbs-down";
      } else if(procesado.feedback_humano == false){
          this.dislikeButton = "pi pi-thumbs-down-fill";
      } else if(procesado.feedback_humano == null){
          this.dislikeButton = "pi pi-thumbs-down";
      }
      return this.dislikeButton;
  }
}
