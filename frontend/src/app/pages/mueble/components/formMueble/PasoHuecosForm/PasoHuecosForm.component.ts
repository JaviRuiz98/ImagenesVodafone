import { Component, Input, OnInit, Output } from '@angular/core';
import { huecoCreacion } from '../../../interfaces/huecoCreacion';
import { categorias_elementos } from 'src/app/interfaces/categoria';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';

@Component({
  selector: 'app-PasoHuecosForm',
  templateUrl: './PasoHuecosForm.component.html',
  styleUrls: ['./PasoHuecosForm.component.css']
})
export class PasoHuecosFormComponent implements OnInit {

  @Input() imagen: string;
  @Output() huecosEmitter:huecoCreacion[] = [];
  constructor(private elementosService: ElementosService) { }

  categoriaSeleccionada?: string;  
  opcionesCategoria: string[] = [];
  categorias_elementos: categorias_elementos[];
  huecos: huecoCreacion[] = [];
  
  ngOnInit() {
    console.log(this.imagen);
  }

  inicializaCategorias_elementos(){
    this.elementosService.getCategorias_elementos().subscribe((categorias: categorias_elementos[]) => {
      this.categorias_elementos = categorias; 
      this.opcionesCategoria = categorias.map((elemento) => elemento.nombre);
    })
  }

}
