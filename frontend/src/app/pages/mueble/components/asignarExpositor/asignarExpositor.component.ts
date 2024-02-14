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
  @Output () expositores_selected = new  EventEmitter<Expositor | null>();

  nombreFiltro: string = '';
  selected_expositor: Expositor | null = null;

  constructor() { }

  ngOnInit() {
    
    
    this.organizarTabla();
  }

  // filtrarPorNombre() {
  //   this.all_expositores_filtrados = this.all_expositores.filter(expositor => {
  //     const nombre = expositor.nombre ? expositor.nombre.toLowerCase() : ""; // Si el nombre es null o undefined, se asigna una cadena vacía
  //     return nombre.includes(this.nombreFiltro.toLowerCase());
  //   });
  //   //this.organizarTabla();
  // }
  

 
 
  organizarTabla() {
    //Organizar la tabla eliminando los elementos ya seleccionados
      this.all_expositores = this.all_expositores.filter(expositor => !this.already_selected_expositores.includes(expositor));


    // Organizar la tabla colocando los elementos seleccionados al principio
    // const seleccionados = this.selected_expositores.slice(); // Creamos una copia del arreglo de seleccionados
    // const noSeleccionados = this.all_expositores_filtrados.filter(expositor => !this.selected_expositores.includes(expositor));

    // this.all_expositores_filtrados = seleccionados.concat(noSeleccionados);
  }

  
  volver() {
    this.expositores_selected.emit(this.selected_expositor);
  }


}
