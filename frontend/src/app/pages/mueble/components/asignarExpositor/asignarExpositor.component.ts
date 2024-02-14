import { Component, Input, OnInit, Output } from '@angular/core';
import { Expositor } from 'src/app/interfaces/expositor';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-asignarExpositor',
  templateUrl: './asignarExpositor.component.html',
  styleUrls: ['./asignarExpositor.component.css']
})
export class AsignarExpositorComponent implements OnInit {

  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  @Input() all_expositores: Expositor[] = [];
  @Input() already_selected_expositores: Expositor[] = []
  @Output () expositores_selected = new  EventEmitter<Expositor[]>();

  all_expositores_filtrados: Expositor[] = []

  nombreFiltro: string = '';
  selected_expositores: Expositor[] = []

  constructor() { }

  ngOnInit() {
    this.all_expositores_filtrados = this.all_expositores;
    this.selected_expositores = this.already_selected_expositores;
    this.organizarTabla();
  }

  filtrarPorNombre() {
    this.all_expositores_filtrados = this.all_expositores.filter(expositor => {
      const nombre = expositor.nombre ? expositor.nombre.toLowerCase() : ""; // Si el nombre es null o undefined, se asigna una cadena vacía
      return nombre.includes(this.nombreFiltro.toLowerCase());
    });
    this.organizarTabla();
  }
  

 
 
  organizarTabla() {
    // Organizar la tabla colocando los elementos seleccionados al principio
    const seleccionados = this.selected_expositores.slice(); // Creamos una copia del arreglo de seleccionados
    const noSeleccionados = this.all_expositores_filtrados.filter(expositor => !this.selected_expositores.includes(expositor));

    this.all_expositores_filtrados = seleccionados.concat(noSeleccionados);
  }

  
  volver() {
    this.expositores_selected.emit(this.selected_expositores);
  }


}
