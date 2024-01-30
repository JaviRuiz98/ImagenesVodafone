import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Input, Output } from '@angular/core';

import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';
import { SelectorImagenesComponent } from '../selector-imagenes/selector-imagenes.component';
import { DialogInformacionProcesadoComponent } from '../dialog-informacion-procesado/dialog-informacion-procesado.component'; // Reemplaza con la ruta correcta a tu componente

import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { PublicMethodsService } from 'src/app/shared/public-methods.service';
import { ImageModule } from 'primeng/image';
import { ProcesamientoService } from 'src/app/servicios/procesamiento-imagenes/procesamiento-services.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'app-paginador-procesamiento-subida',
    templateUrl: './paginador-procesamiento-subida.html',
    styleUrls: ['./paginador-procesamiento-subida.component.css'], 
    standalone: true,
    imports: [
        CommonModule,
        PaginatorModule,
        SelectorImagenesComponent,
        DialogModule,
        ButtonModule,
        DialogInformacionProcesadoComponent,
        SelectButtonModule,
        FormsModule,
        ToastModule,
        ImageModule,
        ConfirmDialogModule
        
    ],
    providers: [
        PrimeIcons,
        ConfirmationService,
        MessageService
    ],
    schemas: [
        /*CUSTOM_ELEMENTS_SCHEMA*/
    ],
})

export class PaginadorProcesamientoSubidaComponent { 

    @Input() procesados: procesados_imagenes[] = [];
    @Input() cargando_procesamiento: boolean = false;
    @Input() id_expositor_selected: number = 0;
    @Input() valueSelected: string = 'new';
    @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File, id_expositor_selected: number }>();

    url_imagenes_procesadas: string = 'http://validador-vf.topdigital.local/imagenes/imagenesProcesamiento/';

    items_per_page: number = 1;
    indice_paginador: number = 0;
    SelectButtonOptions: any[] = [{label:'Nuevo', icon: 'pi pi-plus-circle', value: 'new',  styleClass: "optionColorVodafone" }, {label:'Historial' ,icon: 'pi pi-history', value: 'historial', styleClass: "optionColorVodafone" }];
    feedbackButtonOptions: any[] = [{label:'Like', icon: 'pi pi-thumbs-up', value: 'like',  styleClass: "optionColorVodafone" }, {label:'Dislike' ,icon: 'pi pi-thumbs-down', value: 'dislike', styleClass: "optionColorVodafone" }];
    
    visiblePrompt: boolean = false;
    LikeDislike: number =-1;

    likeButton: string = "pi pi-thumbs-up";
    dislikeButton: string = "pi pi-thumbs-down";

    constructor(private publicMethodsService: PublicMethodsService, private confirmationService: ConfirmationService, private messageService: MessageService, private procesamientoService: ProcesamientoService) { }

    onPageChange(event: any) {
        this.indice_paginador = event.first;
    }

    getElementosPaginados(): procesados_imagenes[] | undefined {
        return this.procesados.slice(this.indice_paginador, this.indice_paginador + this.items_per_page);
    }

    recibirFile(event: {archivo:File}, id_expositor_selected: number) {
        const imagenAProcesar = event.archivo;
        this.archivoSeleccionadoChange.emit({ archivo: imagenAProcesar, id_expositor_selected: id_expositor_selected });
        this.cargando_procesamiento = true;
    }
  
    showDialog() {
        this.visiblePrompt = true;
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
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }


    borrarProcesado(procesado: procesados_imagenes){
        this.valueSelected = 'new';
        this.procesamientoService.deleteProcesado(procesado).subscribe();
        this.procesados.splice(this.procesados.indexOf(procesado), 1);
        this.messageService.add({ severity: 'info', life: 3000,summary: 'Cargando', detail: 'La imagen se borro correctamente' });
    }

    funcionFeedback(procesado: procesados_imagenes, likeDislike: boolean | null) {

        if(procesado.feedback_Humano == null){
            procesado.feedback_Humano = likeDislike;
        } else {
            if(procesado.feedback_Humano == likeDislike){
                procesado.feedback_Humano = null;
            } else {
                procesado.feedback_Humano = likeDislike;
            }
        }

        if(procesado.feedback_Humano == true){
            this.likeButton = "pi pi-thumbs-up-fill";
            this.dislikeButton = "pi pi-thumbs-down";
        } else if(procesado.feedback_Humano == false){
            this.likeButton = "pi pi-thumbs-up";
            this.dislikeButton = "pi pi-thumbs-down-fill";
        } else if(procesado.feedback_Humano == null){
            this.likeButton = "pi pi-thumbs-up";
            this.dislikeButton = "pi pi-thumbs-down";
        }

 
        this.procesamientoService.updateFeedbackProcesado(procesado.id_procesado_imagen, procesado.feedback_Humano).subscribe();

    }

    inicializa_likeButon(procesado: procesados_imagenes){
        
        if(procesado.feedback_Humano == true){
            this.likeButton = "pi pi-thumbs-up-fill";
        } else if(procesado.feedback_Humano == false){
            this.likeButton = "pi pi-thumbs-up";
        } else if(procesado.feedback_Humano == null){
            this.likeButton = "pi pi-thumbs-up";
        }
        return this.likeButton;
    }

    inicializa_dislikeButon(procesado: procesados_imagenes){
        if(procesado.feedback_Humano == true){
            this.dislikeButton = "pi pi-thumbs-down";
        } else if(procesado.feedback_Humano == false){
            this.dislikeButton = "pi pi-thumbs-down-fill";
        } else if(procesado.feedback_Humano == null){
            this.dislikeButton = "pi pi-thumbs-down";
        }
        return this.dislikeButton;
    }


}
