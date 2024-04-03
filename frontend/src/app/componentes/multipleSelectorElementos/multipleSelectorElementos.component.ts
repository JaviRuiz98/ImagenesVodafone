import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { categorias_elementos } from 'src/app/interfaces/categoria';
import { elementos } from 'src/app/interfaces/elementos';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { EnumService } from 'src/app/servicios/enum/enum.service';
import { UrlService } from 'src/app/servicios/url/url.service';

@Component({
  selector: 'app-multipleSelectorElementos',
  templateUrl: './multipleSelectorElementos.component.html',
  styleUrls: ['./multipleSelectorElementos.component.css'],
  standalone: true, 
  imports: [
    ButtonModule,
    ToolbarModule,
    DropdownModule,
    CommonModule,  
    FormsModule,
    TableModule,
    ProgressSpinnerModule,
    InputTextModule
  ],
})
export class MultipleSelectorElementosComponent implements OnInit {



  constructor(private enumService: EnumService, private elementosService: ElementosService, private urlService: UrlService) { }

  @Output () selectedElementosIds = new EventEmitter<number[]>();

  all_elementos: elementos[] = [];
  filtered_elementos: elementos[] = [];
  selected_elementos?: elementos [] = [];
  
  filterNameValue: string="";

  categoria_id_dispositivo : number = 2;
  categoriaSeleccionada?: categorias_elementos;
  categorias_elementos: categorias_elementos[];
  url_imagenes_referencias: string = this.urlService.url_imagenes_referencia;


  ngOnInit() {
    this.inicializarElementos();
    this.inicializaCategorias_elementos();
   
  }

  inicializarElementos(){
    this.elementosService.getElementos().subscribe( (elementos:elementos[]) => {

      this.all_elementos = elementos.filter((elemento) => elemento.categorias_elementos.id !== this.categoria_id_dispositivo);

      this.filtered_elementos=this.all_elementos;
    });
  }


  inicializaCategorias_elementos(){
    this.enumService.getCategorias_elementos().subscribe((categorias: categorias_elementos[]) => {
      this.categorias_elementos = categorias.filter((categoria) => categoria.id !== this.categoria_id_dispositivo); 
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

  borrarElementos() {
    this.selected_elementos = [];
  }

  onSubmit() {
    this.selectedElementosIds.emit(this.selected_elementos?.map(elemento => elemento.id));
  }
    
    


}
