import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Expositor } from 'src/app/interfaces/expositor';
import { muebles } from 'src/app/interfaces/muebles';
import { ExpositoresService } from 'src/app/servicios/expositores/expositores.service';


@Component({
  selector: 'app-formMueble',
  templateUrl: './formMueble.component.html',
  styleUrls: ['./formMueble.component.css']
})


export class FormMuebleComponent implements OnInit {

  
  
  constructor( public dialogConfig : DynamicDialogConfig, private fb: FormBuilder, private expositoresService: ExpositoresService) { }

  showing_expositores: boolean = false;
  all_expositores: Expositor[] = [];

  objetivo_form: 'crear' | 'editar' = 'crear';
  categorias_opciones = ['cartel', 'dispositivos'];
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  formulario:FormGroup = this.fb.group({
    nombre_mueble: ['', Validators.required],
    categoria: [, [Validators.required, this.categoriaValidator()]],
    numero_dispositivos: [0, [Validators.required, Validators.min(0)]],
    expositores: [[], ]
  })
  mueble?: muebles;

  get nombre_mueble() {
    return this.formulario.controls['nombre_mueble'];
  }
  get numero_dispositivos() {
    return this.formulario.controls['numero_dispositivos'];
  } 

  get categoria() {
    return this.formulario.controls['categoria'];
  }

  get expositores() {
    return this.formulario.controls['expositores'];
  }

  ngOnInit() {
   
    if (this.dialogConfig.data) {
      console.log ("editar");
      this.objetivo_form='editar';
      this.mueble = this.dialogConfig.data.mueble;

      this.formulario.patchValue({
        nombre_mueble: this.mueble?.nombre_mueble,
        categoria: this.mueble?.categoria,
        numero_dispositivos: this.mueble?.numero_dispositivos,
        expositores: this.mueble?.expositores
      })
    }else{
      console.log ("nuevo");
      this.objetivo_form='crear';
    }
  }


   categoriaValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const categoria = control.value;
      if (categoria !== 'cartel' && categoria !== 'dispositivos') {
        return { 'categoriaInvalida': { value: categoria } };
      }
      return null;
    };
  }

  showExpositores() {
    
   this.expositoresService.getExpositores().subscribe((data: Expositor[]) => {
    this.all_expositores = data;
    this.showing_expositores=true;
   })
  }
    

  onSubmit() {
  
    if (this.formulario.invalid) {
      return;
    
    }
   
    console.log(this.formulario.value);
  }
  

}
