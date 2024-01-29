import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Input, Output } from '@angular/core';

import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';
import { SelectorImagenesComponent } from '../selector-imagenes/selector-imagenes.component';
import { DialogInformacionProcesadoComponent } from '../dialog-informacion-procesado/dialog-informacion-procesado.component'; // Reemplaza con la ruta correcta a tu componente

import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { PublicMethodsService } from 'src/app/shared/public-methods.service';
import { ImageModule } from 'primeng/image';
import { InfoCircleIcon } from 'primeng/icons/infocircle';
@Component({
    selector: 'app-paginador-procesamiento-subida',
    templateUrl: './paginador-procesamiento-subida.html',
    styleUrls: ['./paginador-procesamiento-subida.component.css'], 
    standalone: true,
    imports: [
        CommonModule,
        PaginatorModule,
        SelectorImagenesComponent,
        TagModule,
        ProgressSpinnerModule,
        DialogModule,
        ButtonModule,
        DialogInformacionProcesadoComponent,
        SelectButtonModule,
        FormsModule,
        ImageModule
    ],
    providers: [
        PrimeIcons
    ]
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
    SelectButtonOptions: any[] = [{label:'Nuevo', icon: 'pi pi-plus-circle', value: 'new',  styleClass: "optionColorVodafone" }, {label:'Historial' ,icon: 'pi pi-history', value: 'historial', styleClass: "optionColorVodafone" }];
    visiblePrompt: boolean = false;

   
    constructor(private publicMethodsService: PublicMethodsService) { }

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

    onMouseOver(event: MouseEvent) {
        this.visible_info_procesamiento = true;
    }

    onMouseOut(event: MouseEvent) {
        this.visible_info_procesamiento = false;
    }
 
    getSeverityCartel(procesado: string): string {
        return this.publicMethodsService.getSeverityCartel(procesado);
      }
    
    getSeverityDispositivos(numero_dispositivos: number, huecos_esperados: number): string {
    return this.publicMethodsService.getSeverityDispositivos(numero_dispositivos, huecos_esperados);
    }
    showDialog() {
        this.visiblePrompt = true;
    }
}
