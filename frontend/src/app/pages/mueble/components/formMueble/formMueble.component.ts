import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { elementos } from 'src/app/interfaces/elementos';
import { muebles } from 'src/app/interfaces/muebles';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { MuebleCreacion } from '../../interfaces/muebleCreacion';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';


@Component({
  selector: 'app-formMueble',
  templateUrl: './formMueble.component.html',
  styleUrls: ['./formMueble.component.css']
})


export class FormMuebleComponent implements OnInit {


  filterNameValue: string ="";

  constructor( public dialogConfig : DynamicDialogConfig, private fb: FormBuilder, private elementosService: ElementosService, private muebleService: MueblesService) { }

  showing_asignar_expositores: boolean = false;
  all_elementos: elementos[] = [];
  filtered_elementos: elementos[] = [];
  dragged_elemento?: elementos;

  

  objetivo_form: 'crear' | 'editar' = 'crear';
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  formulario:FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    elementos: [[], ]
  })


  mueble_existente?: muebles;
  

  get nombre() {
    return this.formulario.controls['nombre'];
  }
  get elementos() {
    return this.formulario.controls['elementos'];
  }

  get filterNameText() {
    return this.filterNameValue;
  }

  ngOnInit() {
   
    if (this.dialogConfig.data) {
      console.log ("editar");
      this.objetivo_form='editar';

      const mueble = this.dialogConfig.data.mueble;
      this.mueble_existente = mueble;

      this.formulario.patchValue({
        nombre_mueble: mueble?.nombre,
        expositores: mueble?.expositores

      })
    }else{
      console.log ("nuevo");
      this.objetivo_form='crear';
    }

      this.elementosService.getElementos().subscribe( (elementos:elementos[]) => {
        this.all_elementos = elementos.filter((elemento) => elemento.categorias_elementos.id !== 3);
        this.filtered_elementos=this.all_elementos;
      });
  }

  filterByNombre(value: string) {
    this.filterNameValue = value;
  
    if (value === "" || value === null) {
      this.filtered_elementos = this.all_elementos;
    } else {
       this.filtered_elementos = this.all_elementos.filter(elemento => 
        elemento.nombre && elemento.nombre.toLowerCase().includes(value.toLowerCase())
      );
    }
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
