import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';
import { SelectorImagenesComponent } from '../selector-imagenes/selector-imagenes.component';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogInformacionProcesadoComponent } from '../dialog-informacion-procesado/dialog-informacion-procesado.component'; // Reemplaza con la ruta correcta a tu componente
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons } from 'primeng/api';


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

    visible_info_dispositivos: boolean = false;
    isTagZoomed = false;

    onPageChange(event: any) {
        this.indice_paginador = event.first;
    }

    getElementosPaginados(): procesados_imagenes[] | undefined {
        return this.indice_paginador === 0 ? undefined : this.procesados.slice(this.indice_paginador-1, this.indice_paginador + this.items_per_page-1);
    }

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
        this.visible_info_dispositivos = true;
        this.isTagZoomed = true;
        const tagElement = event.target as HTMLElement;
        tagElement.classList.add('cursor-zoom');
    }

    onMouseOut(event: MouseEvent) {
        this.visible_info_dispositivos = false;
    }
 

}
