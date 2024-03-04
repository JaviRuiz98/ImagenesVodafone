import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { categorias_elementos } from 'src/app/interfaces/categoria';
import { elementos } from 'src/app/interfaces/elementos';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { EnumService } from 'src/app/servicios/enum.service';

@Component({
  selector: 'app-arrastrarElemento',
  templateUrl: './arrastrarElemento.component.html',
  styleUrls: ['./arrastrarElemento.component.css']
})
export class ArrastrarElementoComponent implements OnInit {

  constructor(private enumService: EnumService, private elementosService: ElementosService) { }
  @Input() mode: 'arrastrar' | 'seleccionar' = 'arrastrar';
  @Input() categoria?: categorias_elementos;
  

  @Output() onDragStart = new EventEmitter<{ dragEvent: DragEvent, elemento: elementos }>();
  @Output() onDragEnd = new EventEmitter<{ dragEvent: CdkDragDrop<string[]> }>();

  @Output() onElementoSeleccionado = new EventEmitter<elementos>();

  show_crear: boolean = false;

  all_elementos: elementos[] = [];
  selected_elemento?: elementos;
  filtered_elementos: elementos[] = [];
  dragged_elemento?: elementos;

  
  filterNameValue: string="";

  categoriaSeleccionada?: categorias_elementos;
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
    this.enumService.getCategorias_elementos().subscribe((categorias: categorias_elementos[]) => {
      this.categorias_elementos = categorias; 
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
  filterByCategoria() {
    if (this.categoriaSeleccionada) {
      this.filtered_elementos = this.all_elementos.filter(elemento => elemento.categorias_elementos.id === this.categoriaSeleccionada.id);
    } else {
      this.filtered_elementos = this.all_elementos;
    }
  }
  dragStart(event: DragEvent, elemento: elementos) {
   
    this.onDragStart.emit({ dragEvent:event, elemento });
    
  }

  dragEnd(event: any) {
    this.dragged_elemento = undefined;
     // Restablecer la posición del elemento
    event.source.element.nativeElement.style.transform = 'none';

    // Opcional: restablecer la posición interna del CDK Drag
    event.source._dragRef.reset();
    this.onDragEnd.emit({ dragEvent: event });
  }

  onElementoSeleccionadoChange(event:any) {
    this.onElementoSeleccionado.emit(event.data);
  }


}
