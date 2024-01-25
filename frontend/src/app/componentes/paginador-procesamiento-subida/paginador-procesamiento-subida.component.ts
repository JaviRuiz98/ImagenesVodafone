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
        FormsModule
    ],
    providers: [
        PrimeIcons
    ]
})

export class PaginadorProcesamientoSubidaComponent { 

    @Input() procesados: procesados_imagenes[] = [];
    @Input() cargando_procesamiento: boolean = false;
    @Input() id_expositor_selected: number = 0;
    @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File, id_expositor_selected: number }>();

    url_imagenes_procesadas: string = 'http://validador-vf.topdigital.local/imagenes/imagenesProcesamiento/';

    items_per_page: number = 1;
    indice_paginador: number = 0;

    visible_info_procesamiento: boolean = false;
 

    SelectButtonOptions: any[] = [{label:'Nuevo', icon: 'pi pi-plus-circle', value: 'new',  styleClass: "optionColorVodafone" }, {label:'Historial' ,icon: 'pi pi-history', value: 'historial', styleClass: "optionColorVodafone" }];

    valueSelected: string = 'new';

  
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



    recibirFile(event: {archivo:File}, id_expositor_selected: number) {
        const imagenAProcesar = event.archivo;
        this.archivoSeleccionadoChange.emit({ archivo: imagenAProcesar, id_expositor_selected: id_expositor_selected });

        this.cargando_procesamiento = true;
    }

    getSeverityCartel(result: string) {
        switch (result) {
            case 'muy alta':
                return 'success';     
            case 'alta':
                return 'warning' as string;     
            case 'media':
                return 'warning' as string;
            case 'baja':
                return 'danger' as string;
            case 'muy baja':
                return 'danger' as string;
            case 'ninguna':
                return 'danger' as string;
            
            default:
                return undefined;
        }
    };

    getSeverityDispositivos(numero_telefonos: number, huecos_esperados: number) {
        if (numero_telefonos == huecos_esperados) {
            return 'success';
        } else {
            return 'warning';
        }
    }

    onMouseOver(event: MouseEvent) {
        this.visible_info_procesamiento = true;
        const tagElement = event.target as HTMLElement;
        tagElement.classList.add('cursor-zoom');
        console.log(tagElement);
    }

    onMouseOut(event: MouseEvent) {
        this.visible_info_procesamiento = false;
    }
 

}
