import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Expositor } from 'src/app/interfaces/expositor';
import { ExpositoresService } from 'src/app/servicios/expositores/expositores.service';


@Component({
  selector: 'app-formMueble',
  templateUrl: './formMueble.component.html',
  styleUrls: ['./formMueble.component.css']
})


export class FormMuebleComponent implements OnInit {

 
  
  constructor( public dialogConfig : DynamicDialogConfig, private fb: FormBuilder, private expositoresService: ExpositoresService) { }

  showing_asignar_expositores: boolean = false;
  all_expositores: Expositor[] = [];
  showing_crear_expositores: boolean = false;
  new_expositor_for_categoria: 'dispositivos' | 'carteles' = 'dispositivos';

  

  objetivo_form: 'crear' | 'editar' = 'crear';
  categorias_opciones = ['cartel', 'dispositivos'];
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  formulario:FormGroup = this.fb.group({
    nombre_mueble: ['', Validators.required],
    numero_expositores_dispositivos: [0, [Validators.required, Validators.min(0)]],
    numero_expositores_carteles: [0, [Validators.required, Validators.min(0)]],
    expositores: [[]]
  })

  expositores_carteles: Expositor[] = [];
  expositores_dispositivos: Expositor[] = [];

  

  get nombre_mueble() {
    return this.formulario.controls['nombre_mueble'];
  }
  get numero_expositores_dispositivos() {
    return this.formulario.controls['numero_expositores_dispositivos'];
  } 
  get numero_expositores_carteles() {
    return this.formulario.controls['numero_expositores_carteles'];
  }

  get expositores() {
    return this.formulario.controls['expositores'];
  }
  get expositores_dispositivos_list() {
    return this.expositores_dispositivos;
  }

  get expositores_carteles_list() {
    return this.expositores_carteles;
  }
  ngOnInit() {
   
    if (this.dialogConfig.data) {
      console.log ("editar");
      this.objetivo_form='editar';
      const mueble = this.dialogConfig.data.mueble;

      this.expositores_carteles = mueble?.expositores_carteles;
      this.expositores_dispositivos = mueble?.expositores_dispositivos;

      this.formulario.patchValue({
        nombre_mueble: mueble?.nombre_mueble,
        numero_expositores_carteles: mueble?.numero_expositores_carteles,
        numero_expostores_dispositivos: mueble?.numero_expositores_dispositivos,
        expositores: mueble?.expositores
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

  createExpositores(categoria:string) {
    throw new Error('Method not implemented.');
  }

  showExpositores(categoria: 'carteles' | 'dispositivos') {
    
   
    this.expositoresService.getExpositores(categoria).subscribe( (expositores:Expositor[]) => {
      this.all_expositores = expositores;
      this.new_expositor_for_categoria = categoria;
      this.showing_asignar_expositores = true;

   });
     
  }
  asignar_expositores(event: Expositor | null) {
    this.showing_asignar_expositores = false;
    if (event != null) {
      // Añadimos el expositor al formulario
      this.formulario.patchValue({
        expositores: this.expositores.value.concat(event)
      });
  
      // Añadimos el expositor al array correspondiente para mostrarlos
      if (this.new_expositor_for_categoria === 'carteles') {
        
        this.expositores_carteles = this.expositores_carteles.concat(event);
      } else {
        
        this.expositores_dispositivos = this.expositores_dispositivos.concat(event);
      }
      
      
    }
  }

  deleteExpositor(categoria: 'carteles' | 'dispositivos', expositor: Expositor) {
    if (categoria === 'carteles') {
      this.expositores_carteles = this.expositores_carteles.filter((e) => e.id !== expositor.id);
    }else{
      this.expositores_dispositivos = this.expositores_dispositivos.filter((e) => e.id !== expositor.id);
    }
  }
  

  onSubmit() {
  
    if (this.formulario.invalid) {
      return;
    
    }
   
    console.log(this.formulario.value);
  }
  

}
