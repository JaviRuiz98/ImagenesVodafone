import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';
import { SelectorImagenesComponent } from '../selector-imagenes/selector-imagenes.component';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
 
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
        ProgressSpinnerModule
    ],
})

export class PaginadorProcesamientoSubidaComponent { 

    @Input() procesados: procesados_imagenes[] = [];
    @Input() cargando_procesamiento: boolean = false;
    @Input() id_expositor_selected: number = 0;
    @Output() dialog_procesado: procesados_imagenes[] = [];
    @Output() mostrar_info: boolean = false;
    @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File, id_expositor_selected: number }>();

    url_imagenes_procesadas: string = 'http://localhost:3000/imagenesProcesamiento/';

    items_per_page: number = 1;
    indice_paginador: number = 0;
    visible_info_cartel: boolean = false;

    onPageChange(event: any) {
        this.indice_paginador = event.first;
    }

    ngOnChanges(aviso_procesamiento_completado: boolean) {
        if (aviso_procesamiento_completado) {
            this.cargando_procesamiento = false;
        }
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

    onMouseOverCartel(event: MouseEvent) {
        this.visible_info_cartel = !this.visible_info_cartel;
    }



}
