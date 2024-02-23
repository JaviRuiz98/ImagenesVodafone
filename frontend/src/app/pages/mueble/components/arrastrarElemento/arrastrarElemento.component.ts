import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { categorias_elementos } from 'src/app/interfaces/categoria';
import { elementos } from 'src/app/interfaces/elementos';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';

@Component({
  selector: 'app-arrastrarElemento',
  templateUrl: './arrastrarElemento.component.html',
  styleUrls: ['./arrastrarElemento.component.css']
})
export class ArrastrarElementoComponent implements OnInit {


  constructor(private elementosService: ElementosService) { }
  @Input() mode: 'arrastrar' | 'seleccionar' = 'arrastrar';
  @Input() categoria?: categorias_elementos;

  @Output() onDragStart = new EventEmitter<{ dragEvent: DragEvent, elemento: elementos }>();
  @Output() onDragEnd = new EventEmitter<{ dragEvent: DragEvent }>();

  all_elementos: elementos[] = [];
  selected_elemento?: elementos;
  filtered_elementos: elementos[] = [];
  dragged_elemento?: elementos;

  
  filterNameValue: string="";
  categoriaSeleccionada?: string;
   
  opcionesCategoria: string[] = [];
  categorias_elementos: categorias_elementos[];
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';


  ngOnInit() {
    this.inicializarElementos();
    this.inicializaCategorias_elementos();
    
  }

  
  inicializarElementos(){
    this.elementosService.getElementos().subscribe( (elementos:elementos[]) => {

      this.all_elementos = elementos.filter((elemento) => elemento.categorias_elementos.id !== 3);
      if (this.categoria) {
        this.all_elementos = this.all_elementos.filter((elemento) => elemento.categorias_elementos.id === this.categoria.id);
      }
      this.filtered_elementos=this.all_elementos;
    });
  }

  inicializaCategorias_elementos(){
    this.elementosService.getCategorias_elementos().subscribe((categorias: categorias_elementos[]) => {
      this.categorias_elementos = categorias; 
      this.opcionesCategoria = categorias.map((elemento) => elemento.nombre);
    })
  }

  filterByNombre(value: string) {
    if (value === "" || value === null) {
      this.filtered_elementos = this.all_elementos;
    } else {
       this.filtered_elementos = this.all_elementos.filter(elemento => 
        elemento.nombre && elemento.nombre.toLowerCase().includes(value.toLowerCase())
      );
    }
  }
  dragStart(event: DragEvent, elemento: elementos) {
    this.dragged_elemento = elemento;
    this.onDragStart.emit({ dragEvent:event, elemento });
  }

  dragEnd(event: DragEvent) {
    this.dragged_elemento = undefined;
    this.onDragEnd.emit({ dragEvent: event });
  }


}
