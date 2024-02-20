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

 
  
  constructor( public dialogConfig : DynamicDialogConfig, private fb: FormBuilder, private elementosService: ElementosService, private muebleService: MueblesService) { }

  showing_asignar_expositores: boolean = false;
  all_expositores: elementos[] = [];
  showing_crear_expositores: boolean = false;
  new_expositor_for_categoria: number = 0;

  

  objetivo_form: 'crear' | 'editar' = 'crear';
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  formulario:FormGroup = this.fb.group({
    nombre_mueble: ['', Validators.required],
    elementos: [[]]
    // numero_expositores_dispositivos: [0, [Validators.required, Validators.min(0)]],
    // numero_expositores_carteles: [0, [Validators.required, Validators.min(0)]],
  })

  elementos_carteles: elementos[] = [];
  elementos_dispositivos: elementos[] = [];
  id_mueble_existente?:number;
  

  get nombre_mueble() {
    return this.formulario.controls['nombre_mueble'];
  }
  get expositores() {
    return this.formulario.controls['expositores'];
  }
  get expositores_dispositivos_list() {
    return this.elementos_dispositivos;
  }

  get expositores_carteles_list() {
    return this.elementos_carteles;
  }
  // get numero_expositores_dispositivos() {
  //   return this.formulario.controls['numero_expositores_dispositivos'];
  // } 
  // get numero_expositores_carteles() {
  //   return this.formulario.controls['numero_expositores_carteles'];
  // }

  ngOnInit() {
   
    if (this.dialogConfig.data) {
      console.log ("editar");
      this.objetivo_form='editar';

      const mueble = this.dialogConfig.data.mueble;
      this.id_mueble_existente = mueble?.id;

      this.elementos_carteles = mueble?.expositores_carteles;
      this.elementos_dispositivos = mueble?.expositores_dispositivos;

      this.formulario.patchValue({
        nombre_mueble: mueble?.nombre_mueble,
        expositores: mueble?.expositores
        // numero_expositores_carteles: mueble?.numero_expositores_carteles,
        // numero_expostores_dispositivos: mueble?.numero_expositores_dispositivos,
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

  createExpositores(categoria: number) {
   this.new_expositor_for_categoria = categoria;
   this.showing_crear_expositores = true;
  }

  showExpositores(categoria: number) {
    
   
    this.elementosService.getElementos(categoria).subscribe( (expositores:elementos[]) => {
      this.all_expositores = expositores;
      this.new_expositor_for_categoria = categoria;
      this.showing_asignar_expositores = true;

   });
     
  }
  asignar_expositores(event: elementos | null) {
    // this.showing_asignar_expositores = false;
    // if (event != null) {
    //   // Añadimos el expositor al formulario
    //   this.formulario.patchValue({
    //     expositores: this.expositores.value.concat(event)
    //   });
  
    //   // Añadimos el expositor al array correspondiente para mostrarlos
    //   if (this.new_expositor_for_categoria === 'Carteles') {
        
    //     this.expositores_carteles = this.expositores_carteles.concat(event);
    //   } else {
        
    //     this.expositores_dispositivos = this.expositores_dispositivos.concat(event);
    //   }
      
      
    // }
  }

  deleteExpositor(categoria: 'carteles' | 'dispositivos', expositor: elementos) {
    // if (categoria === 'carteles') {
    //   this.expositores_carteles = this.expositores_carteles.filter((e) => e.id !== expositor.id);
    // }else{
    //   this.expositores_dispositivos = this.expositores_dispositivos.filter((e) => e.id !== expositor.id);
    // }
  }
  

  onSubmit() {
  
    // if (this.formulario.invalid) {
    //   return;
    
    // }else{
     
      
    //   const InfoMueble: MuebleCreacion = {
    //     nombre_mueble: this.formulario.value.nombre_mueble,
    //     numero_expositores_carteles: this.expositores_carteles_list.length ,
    //     numero_expositores_dispositivos: this.expositores_dispositivos_list.length,
    //     expositores: this.expositores.value
    //   }
    //   if (this.objetivo_form === 'crear') {
        
    //     console.log(InfoMueble);
    //     this.muebleService.createMueble(InfoMueble).subscribe(
        

    //     );    
    //   }else {
    //     const muebleEdicion: muebles = {
    //       id: this.id_mueble_existente!,  //no puede ser nulo si está en edición
    //       ...InfoMueble
    //     }

    //     console.log(muebleEdicion);
    //     this.muebleService.updateMueble(muebleEdicion).subscribe();
    //     //realizar llamada al servicio
    //   }
     
      
    // }
  
  }
  

}
