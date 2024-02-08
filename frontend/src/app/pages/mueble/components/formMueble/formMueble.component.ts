import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { muebles } from 'src/app/interfaces/muebles';


@Component({
  selector: 'app-formMueble',
  templateUrl: './formMueble.component.html',
  styleUrls: ['./formMueble.component.css']
})


export class FormMuebleComponent implements OnInit {

  
  
  constructor( public dialogConfig : DynamicDialogConfig, private fb: FormBuilder) { }

  formulario:FormGroup = this.fb.group({
    nombre_mueble: ['', Validators.required],
    categoria: ['dispositivos', [Validators.required, this.categoriaValidator()]],
    numero_dispositivos: [0, [Validators.required, Validators.min(0)]],
    expositores: [[], ]
  })


  mueble : muebles | null = this.dialogConfig.data.mueble;

  get nombre_mueble() {
    return this.formulario.get('nombre_mueble');
  }
  get numero_dispositivos() {
    return this.formulario.get('numero_dispositivos');
  } 

  get categoria() {
    return this.formulario.get('categoria');
  }

  ngOnInit() {
    console.log("hola");
    console.log (this.mueble);
    if (this.mueble) {
      this.formulario.patchValue({
        nombre_mueble: this.mueble?.nombre_mueble,
        categoria: this.mueble?.categoria,
        numero_dispositivos: this.mueble?.numero_dispositivos,
        expositores: this.mueble?.expositores
      })
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
  

}
