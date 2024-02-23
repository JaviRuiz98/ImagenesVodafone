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

  constructor(public dialogConfig : DynamicDialogConfig, private fb: FormBuilder) { }

  //PROCEDENCIA FORM
  @Input () imagen?: string;
  @Input() hueco?: huecoCreacion;

  @Output() formularioPasoAsignarElemento = new EventEmitter<FormGroup>();


  expositor ?: expositores;


  opcionesCategoria: string[] = [];
  categorias_elementos: categorias_elementos[];
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  formularioAsignarElemento?: FormGroup;

  ngOnInit() {
    
  }

  



  onSubmit() {
  }
}
