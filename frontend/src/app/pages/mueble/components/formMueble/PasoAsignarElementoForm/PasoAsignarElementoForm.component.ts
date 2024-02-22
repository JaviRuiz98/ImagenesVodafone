import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { categorias_elementos } from 'src/app/interfaces/categoria';
import { elementos } from 'src/app/interfaces/elementos';
import { expositores } from 'src/app/interfaces/expositores';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { huecoCreacion } from '../../../interfaces/huecoCreacion';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-PasoAsignarElementoForm',
  templateUrl: './PasoAsignarElementoForm.component.html',
  styleUrls: ['./PasoAsignarElementoForm.component.css']
})
export class PasoAsignarElementoFormComponent implements OnInit {

  constructor(public dialogConfig : DynamicDialogConfig, private fb: FormBuilder, private elementosService: ElementosService) { }

  @Input () procedencia_form: 'form' | 'tabla' = 'tabla';

  //PROCEDENCIA FORM
  @Input () imagen?: string;
  @Input() hueco?: huecoCreacion;

  @Output() formularioPasoAsignarElemento = new EventEmitter<FormGroup>();


  expositor ?: expositores;

  all_elementos: elementos[] = [];
  filtered_elementos: elementos[] = [];
  dragged_elemento?: elementos;

  filterNameValue: string="";
  categoriaSeleccionada?: string;

  
  opcionesCategoria: string[] = [];
  categorias_elementos: categorias_elementos[];
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  formularioAsignarElemento?: FormGroup;

  ngOnInit() {
  console.log("Hola");
    //Si viene de form
    if (this.procedencia_form === 'form'){
     
        this.formularioAsignarElemento = this.fb.group({
          huecos_elementos:  new FormControl ([],Validators.required),
        });
      

      //Si viene de la tabla
    }else { 
      
      if (this.dialogConfig.data){
       this.expositor = this.dialogConfig.data.expositor;
        if (!!this.expositor){
          this.formularioAsignarElemento = new FormGroup({
            expositor: new FormControl(this.expositor, Validators.required),
          });


        }
      }
     
    }

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

  getImagenModelo(): string | undefined {
    const atributoModelo: atributos_expositores | undefined = this.expositor.atributos_expositores.find((atributo) => atributo.id_categoria === 3);
    
    if (atributoModelo && atributoModelo.elemento) {
      console.log("imagen: "+atributoModelo.elemento.imagenes.url);
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

  onSubmit() {
    
    if (this.procedencia_form === 'form'){
      if (this.formularioAsignarElemento?.valid){
        console.log("form actualizado: "+ this.formularioAsignarElemento.value.elemento);
        this.formularioPasoAsignarElemento.emit(this.formularioAsignarElemento);
      }
    }else {
       const expositor: expositores = this.formularioAsignarElemento.value.expositor;
       console.log("expositor: "+expositor);
       //post al servicio para añadir el elemento
      
    }
  }
}
