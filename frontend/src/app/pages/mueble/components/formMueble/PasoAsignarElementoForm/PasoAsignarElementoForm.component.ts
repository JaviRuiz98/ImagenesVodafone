import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { elementos } from 'src/app/interfaces/elementos';
import { expositores } from 'src/app/interfaces/expositores';

import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UrlService } from 'src/app/servicios/url/url.service';


@Component({
  selector: 'app-PasoAsignarElementoForm',
  templateUrl: './PasoAsignarElementoForm.component.html',
  styleUrls: ['./PasoAsignarElementoForm.component.css']
})
export class PasoAsignarElementoFormComponent implements OnInit {


  constructor(private urlService: UrlService, public dialogConfig : DynamicDialogConfig, private fb: FormBuilder) { }


  @Input () expositorFormulario: FormGroup; 


  get nombre_expositor() {
    return this.expositorFormulario.controls['nombre_expositor'];
  }

  get imagen_expositor() {
    return this.expositorFormulario.controls['imagen'];
  }

  get atributos_expositores() {
    return this.expositorFormulario.controls['atributos_expositores'] as FormArray;
  }
  



  ngOnInit() {
    console.log(this.expositorFormulario);
  }

  
}
