import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';
import { SelectorImagenesComponent } from '../selector-imagenes/selector-imagenes.component';

@Component({
    selector: 'app-paginador-procesamiento-subida',
    templateUrl: './paginador-procesamiento-subida.html',
    styleUrls: ['./paginador-procesamiento-subida.component.css'], 
    standalone: true,
    imports: [
        CommonModule,
        PaginatorModule,
        SelectorImagenesComponent
    ],


})


export class PaginadorProcesamientoSubidaComponent { 

    @Input() procesados: procesados_imagenes[] = [];
    @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();

    url_imagenes_procesadas: string = 'http://localhost:3000/imagenesProcesamiento/';

    items_per_page: number = 1;
    indice_paginador: number = 0;


    onPageChange(event: any) {
        this.indice_paginador = event.first;
    }

    getElementosPaginados(): procesados_imagenes[] | undefined {
        console.log( this.indice_paginador, this.items_per_page)    
        return this.indice_paginador === 0 ? undefined : this.procesados.slice(this.indice_paginador-1, this.indice_paginador + this.items_per_page);
    
    }

    recibirFile(event: {archivo:File}){
        const imagenAProcesar = event.archivo;
         this.archivoSeleccionadoChange.emit({ archivo: imagenAProcesar });
      }
    

}
