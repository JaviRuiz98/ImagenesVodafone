import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Input, Output } from '@angular/core';

import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';
import { SelectorImagenesComponent } from '../selector-imagenes/selector-imagenes.component';
import { DialogInformacionProcesadoComponent } from '../dialog-informacion-procesado/dialog-informacion-procesado.component'; // Reemplaza con la ruta correcta a tu componente

import { GalleriaModule } from 'primeng/galleria';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { PublicMethodsService } from 'src/app/shared/public-methods.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
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
        SelectorImagenesComponent,
        TagModule,
        ProgressSpinnerModule,
        DialogModule,
        ButtonModule,
        DialogInformacionProcesadoComponent,
        SelectButtonModule,
        GalleriaModule,
        FormsModule,
        ToastModule,
        OverlayPanelModule,
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

    visible_info_procesamiento: boolean = false;
    visible_info_procesamiento_click: boolean = false;

    SelectButtonOptions: any[] = [{label:'Nuevo', icon: 'pi pi-plus-circle', value: 'new',  styleClass: "optionColorVodafone" }, {label:'Historial' ,icon: 'pi pi-history', value: 'historial', styleClass: "optionColorVodafone" }];
  
    responsiveOptions = [
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

    constructor(private publicMethodsService: PublicMethodsService, private confirmationService: ConfirmationService, private messageService: MessageService, private procesamientoService: ProcesamientoService) { }

    onPageChange(event: any) {
        this.indice_paginador = event.first;
    }


    recibirFile(event: {archivo:File}, id_expositor_selected: number) {
        const imagenAProcesar = event.archivo;
        this.archivoSeleccionadoChange.emit({ archivo: imagenAProcesar, id_expositor_selected: id_expositor_selected });

        this.cargando_procesamiento = true;
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

}
