import { Component, Input, OnInit } from '@angular/core';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { categorias_elementos } from 'src/app/interfaces/categoria';
import { elementos } from 'src/app/interfaces/elementos';
import { expositores } from 'src/app/interfaces/expositores';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';

@Component({
  selector: 'app-PasoAsignarElementoForm',
  templateUrl: './PasoAsignarElementoForm.component.html',
  styleUrls: ['./PasoAsignarElementoForm.component.css']
})
export class PasoAsignarElementoFormComponent implements OnInit {

  constructor(private elementosService: ElementosService) { }

  @Input () imagen?: string;

  all_elementos: elementos[] = [];
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

  getImagenModelo(expositor: expositores): string | undefined {
    const atributoModelo: atributos_expositores | undefined = expositor.atributos_expositores.find((atributo) => atributo.id_categoria === 3);

    
    if (atributoModelo && atributoModelo.elemento) {
      return atributoModelo.elemento.imagenes.url;
    } else {
      return undefined;
    }

  }


  onDragStart( $event: DragEvent, elemento: elementos) {
    this.dragged_elemento = elemento;
  }

  onDragEnd($event: DragEvent) {
    console.log("terminar");
  }
}
