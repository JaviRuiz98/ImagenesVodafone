import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
import { VisualizacionProcesadosComponent } from '../visualizacion-procesados/visualizacion-procesados.component';

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
        ConfirmDialogModule,
        
        VisualizacionProcesadosComponent
    ],
    providers: [
        PrimeIcons,
        ConfirmationService,
        MessageService
    ],
    schemas: [],
})

export class PaginadorProcesamientoSubidaComponent { 

    @Input() procesados: procesados_imagenes[] = [];
    @Input() cargando_procesamiento: boolean = false;
    @Input() id_expositor_selected: number = 0;
    @Input() valueSelected: string = 'new';
    @Input() id_auditoria: number = 0;
    @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File, id_expositor_selected: number }>();

    
    SelectButtonOptions: any[] = [{label:'Nuevo', icon: 'pi pi-plus-circle', value: 'new',  styleClass: "optionColorVodafone" }, {label:'Historial' ,icon: 'pi pi-history', value: 'historial', styleClass: "optionColorVodafone" }];
    feedbackButtonOptions: any[] = [{label:'Like', icon: 'pi pi-thumbs-up', value: 'like',  styleClass: "optionColorVodafone" }, {label:'Dislike' ,icon: 'pi pi-thumbs-down', value: 'dislike', styleClass: "optionColorVodafone" }];

    constructor(private publicMethodsService: PublicMethodsService, private confirmationService: ConfirmationService, private messageService: MessageService, private procesamientoService: ProcesamientoService) { }

    recibirFile(event: {archivo:File}, id_expositor_selected: number) {
        const imagenAProcesar = event.archivo;
        this.archivoSeleccionadoChange.emit({ archivo: imagenAProcesar, id_expositor_selected: id_expositor_selected });
        this.cargando_procesamiento = true;
    }
}
