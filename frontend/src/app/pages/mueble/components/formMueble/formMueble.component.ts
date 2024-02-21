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


  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';


  constructor( public dialogConfig : DynamicDialogConfig, private fb: FormBuilder, private elementosService: ElementosService, private muebleService: MueblesService) { }

  showing_asignar_expositores: boolean[] = [];



  objetivo_form: 'crear' | 'editar' = 'crear';

  formulario:FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    expositores: [[],],
   
  })


  mueble_existente: muebles = {
    id: 0,
    nombre: '',
    expositores: []
  };
  

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
      const showing_asignar_expositores_index: number | undefined = this.dialogConfig.data.showing_asignar_expositores_index;

      this.mueble_existente = mueble;

      const expositoresCount = mueble.expositores.length;
      this.showing_asignar_expositores = new Array(expositoresCount).fill(false);
      if (showing_asignar_expositores_index !== undefined) {
        
        this.showing_asignar_expositores[showing_asignar_expositores_index] = true;
      }

      this.formulario.patchValue({
        nombre: mueble?.nombre,
        expositores: mueble?.expositores

      })
    }else{
      console.log ("nuevo");
      this.objetivo_form='crear';
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
  tieneModelo(atributos_expositores: atributos_expositores[]): boolean {
    const atributoModelo: atributos_expositores | undefined = atributos_expositores.find((atributo) => atributo.id_categoria === 3);
    return atributoModelo !== undefined;
  }

  showingExpositoresIsFalse(): boolean {
    return !this.showing_asignar_expositores.includes(true) || this.showing_asignar_expositores.length === 0;
  }

  getExpositorTrue(): expositores | undefined {
    const index = this.showing_asignar_expositores.indexOf(true);
    if (index !== -1) {
      return this.mueble_existente.expositores[index];
    }
    return undefined;
  }
  showingExpositoresIsIndeedFalse() {
    const expositoresCount = this.mueble_existente.expositores.length;
    this.showing_asignar_expositores = new Array(expositoresCount).fill(false);
  }
 
 


  onSubmit() {
    throw new Error('Method not implemented.');
  }

 
    
    
  

}
