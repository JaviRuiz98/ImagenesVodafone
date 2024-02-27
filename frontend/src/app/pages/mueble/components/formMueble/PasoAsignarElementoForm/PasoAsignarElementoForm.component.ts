import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { elementos } from 'src/app/interfaces/elementos';
import { expositores } from 'src/app/interfaces/expositores';

import { DynamicDialogConfig } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-PasoAsignarElementoForm',
  templateUrl: './PasoAsignarElementoForm.component.html',
  styleUrls: ['./PasoAsignarElementoForm.component.css']
})
export class PasoAsignarElementoFormComponent implements OnInit {


  constructor(public dialogConfig : DynamicDialogConfig, private fb: FormBuilder) { }

  /*
    SI VIENE DE CREAR ME PUEDEN PASAR UNA IMAGEN Y UN ARRAY DE HUECOS O NADA
    SI VIENE DE EDITAR ME ENVÍAN UN EXPOSITOR QUE PUEDE TENER IMAGEN O NO
  */


  @Input () formulario: FormGroup; 
  @Input () index? : number

  



 


  get atributo_expositor() {
    return this.formulario.controls['atributo_expositor'];
  }

  ngOnInit() {
    if (this.expositores) {
      console.log("editar");
      this.formPasoAsignarElemento.patchValue({
        expositor: this.expositores,
      });
      this.onSubmit();
    }else{
      console.log("nuevo");
      this.formPasoAsignarElemento.valueChanges.subscribe(() => {
        this.onSubmit();
      });
  
  
    }
  }

  onElementoSeleccionadoSinImagenNiHuecos($event: elementos) {
    const expositor:expositores = {
      id:0,
      nombre:'',
      atributos_expositores: [{
        elemento: $event,
       categorias_elementos: $event.categorias_elementos, //por defecto al no haber huecos, es la misma categoria que el elemento
      }]

    }

    this.formPasoAsignarElemento.patchValue({
      expositor: expositor
    })
    console.log(this.atributo_expositor.value);
  }
  onSubmit() {
    this.formularioPasoAsignarElemento.emit
  }
}
