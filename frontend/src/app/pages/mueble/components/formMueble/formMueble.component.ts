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

  categorias_opciones = ['cartel', 'dispositivos'];

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

  ngOnInit() {
   
    if (this.dialogConfig.data) {
      console.log ("editar");
      this.mueble = this.dialogConfig.data.mueble;

      this.formulario.patchValue({
        nombre_mueble: this.mueble?.nombre_mueble,
        categoria: this.mueble?.categoria,
        numero_dispositivos: this.mueble?.numero_dispositivos,
        expositores: this.mueble?.expositores
      })
    }else{
      console.log ("nuevo");
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

  onSubmit() {
  
    if (this.formulario.invalid) {
      return;
    }
    // Si el formulario es válido, puedes enviar los datos
    console.log(this.formulario.value);
  }
  

}
