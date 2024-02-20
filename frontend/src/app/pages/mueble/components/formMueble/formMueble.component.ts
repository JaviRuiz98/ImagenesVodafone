import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { elementos } from 'src/app/interfaces/elementos';
import { muebles } from 'src/app/interfaces/muebles';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { MuebleCreacion } from '../../interfaces/muebleCreacion';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { categorias_elementos } from 'src/app/interfaces/categoria';
import { expositores } from 'src/app/interfaces/expositores';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';


@Component({
  selector: 'app-formMueble',
  templateUrl: './formMueble.component.html',
  styleUrls: ['./formMueble.component.css']
})


export class FormMuebleComponent implements OnInit {



  constructor( public dialogConfig : DynamicDialogConfig, private fb: FormBuilder, private elementosService: ElementosService, private muebleService: MueblesService) { }

  showing_asignar_expositores: boolean = false;
  all_elementos: elementos[] = [];
  filtered_elementos: elementos[] = [];
  dragged_elemento?: elementos;

  
  opcionesCategoria: string[] = [];
  categorias_elementos: categorias_elementos[];


  objetivo_form: 'crear' | 'editar' = 'crear';
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  formulario:FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    expositores: [[],],
    categoriaSeleccionada: new FormControl<categorias_elementos | null>(null),
    filterNameValue: new FormControl<string | null>(null),

  })


  mueble_existente?: muebles;
  

  get nombre() {
    return this.formulario.controls['nombre'];
  }
  get elementos() {
    return this.formulario.controls['elementos'];
  }

  get filterNameValue() {
    return this.formulario.controls['filterNameValue'];
  }


  ngOnInit() {
   
    if (this.dialogConfig.data) {
      console.log ("editar");
      this.objetivo_form='editar';

      const mueble = this.dialogConfig.data.mueble;
      this.mueble_existente = mueble;

      this.formulario.patchValue({
        nombre: mueble?.nombre,
        expositores: mueble?.expositores

      })
    }else{
      console.log ("nuevo");
      this.objetivo_form='crear';
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

  getImagenModelo(expositor: expositores): string | undefined {
    const atributoModelo: atributos_expositores | undefined = expositor.atributos_expositores.find((atributo) => atributo.id_categoria === 3);

    
    if (atributoModelo && atributoModelo.elemento) {
      return atributoModelo.elemento.imagenes.url;
    } else {
      console.log("Hola");
      return undefined;
    }

  }
  tieneModelo(atributos_expositores: atributos_expositores[]): boolean {
    const atributoModelo: atributos_expositores | undefined = atributos_expositores.find((atributo) => atributo.id_categoria === 3);
    return atributoModelo !== undefined;
  }
 
  

  onDragStart( $event: DragEvent, elemento: elementos) {
    this.dragged_elemento = elemento;
  }

  onDragEnd($event: DragEvent) {
    console.log("terminar");
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }

 
    
    
  

}
