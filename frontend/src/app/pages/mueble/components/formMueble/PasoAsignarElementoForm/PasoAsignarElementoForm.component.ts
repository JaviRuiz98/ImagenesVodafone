import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';


import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { elementos } from 'src/app/interfaces/elementos';
import { UrlService } from 'src/app/servicios/url/url.service';


@Component({
  selector: 'app-PasoAsignarElementoForm',
  templateUrl: './PasoAsignarElementoForm.component.html',
  styleUrls: ['./PasoAsignarElementoForm.component.css']
})
export class PasoAsignarElementoFormComponent implements OnInit {


  constructor(private urlService: UrlService, public dialogConfig : DynamicDialogConfig) { }


  @Input () expositorFormulario: FormGroup|undefined; 
  @Output () formularioPasoAsignarEditarAtributo = new EventEmitter<{index:number, atributo: atributos_expositores} >();
  @Output () formularioPasoAsignarCrearAtributo = new EventEmitter<atributos_expositores>();


  get nombre_expositor() {
    return this.expositorFormulario? this.expositorFormulario.get('nombre_expositor'): undefined;
  }


  get atributos_expositores() {
    return this.expositorFormulario?this.expositorFormulario.get('atributos_expositores') as FormArray : undefined;
  }


  onEditElementosSeleccionados($event: atributos_expositores ) {
    this.formularioPasoAsignarEditarAtributo.emit({index:0, atributo: $event});
  }

  onCreateElementoSeleccionadoSinHuecos($event: elementos){
    
    const atributo: atributos_expositores = {
      categorias_elementos: $event.categorias_elementos, // por defecto será la del elemento
      elemento: $event,
    };
   this.formularioPasoAsignarCrearAtributo.emit(atributo);
  }

 
  ngOnInit() {
  
    console.log("expositor: ",this.expositorFormulario);
  }

  
}
