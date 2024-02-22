import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { muebles } from 'src/app/interfaces/muebles';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { expositores } from 'src/app/interfaces/expositores';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-formMueble',
  templateUrl: './formMueble.component.html',
  styleUrls: ['./formMueble.component.css']
})




export class FormMuebleComponent implements OnInit {

  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  //FORMULARIOS
  formularioPaso1: FormGroup | undefined;
  formularioPasoHuecoForm: FormGroup[] = [];
  formularioPasoAsignarElementoForm: FormGroup[] = [];

  objetivo_form: 'crear' | 'editar' = 'crear';

  constructor( public dialogConfig : DynamicDialogConfig, private fb: FormBuilder, private elementosService: ElementosService, private muebleService: MueblesService) { }

  //STEPPER
  step_count: number = 2;
  activeIndex:number = 0;
  steps: MenuItem [] | undefined;
  isValidNextStep: boolean = false;
  rangeArray: number[] = [];

  imagenes_iniciales: string [] | undefined;
  index_imagen_actual: number = 0;

  mueble_existente: muebles = {
    id: 0,
    nombre: '',
    expositores: []
  };
  

  

  ngOnInit() {
   
    if (this.dialogConfig.data) {
      console.log ("editar");
      this.objetivo_form='editar';

      const mueble = this.dialogConfig.data.mueble;

      const showing_asignar_expositores_index: number | undefined = this.dialogConfig.data.showing_asignar_expositores_index; //IR DIRECTO AL PASO

      this.mueble_existente = mueble;

     
      this.imagenes_iniciales = mueble.expositores.map((expositor :expositores) => {
        if (this.tieneModelo(expositor.atributos_expositores)) {
          return this.url_imagenes_referencias+this.getImagenModelo(expositor);
        }
        return undefined;
      });

      this.step_count = this.imagenes_iniciales.length*2+1;
      
    }else{
      console.log ("nuevo");
      this.objetivo_form='crear';
    }

     // Genera los pasos iniciales
     this.generateSteps();

     this.updateIsValidNextStep();
     
  }

  

  generateSteps() {
    this.steps = [
      {
        label: 'Base'
      }
    ];
  
    // Si step_count es exactamente 2, solo agrega "Asignar elementos"
    if (this.step_count === 2) {
      this.steps.push({
        label: 'Asignar elementos'
      });
    } else {
      // Para cualquier otro caso, itera y agrega los pasos necesarios
      for (let i = 0; i < this.step_count; i += 2) {
        
        if (i + 1 < this.step_count) {
          this.steps.push({
            label: 'Selección de huecos'
          });
          this.steps.push({
            label: 'Asignar elementos'
          });
        }
      }
    }
    this.rangeArray= this.generateRangeArray(0,this.step_count-1);
  }

  generateRangeArray(start: number, end: number): number[] {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx);
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

  activeIndexIsPair(): boolean {
   return this.activeIndex % 2 === 0;
  }

  
  onFormularioPaso1Change($event: FormGroup<any>) {
    console.log("form actualizado: "+ $event.value.nombre);
    this.formularioPaso1 = $event;
    this.step_count = this.formularioPaso1.value.imagenes.length== 0 ? 2 : this.formularioPaso1.value.imagenes.length*2+1;
    this.updateIsValidNextStep();
    this.generateSteps();

  }
 
 
  updateIsValidNextStep(): void {
   if (this.activeIndex === 0) {
    
    this.isValidNextStep = true;
    //  this.isValidNextStep = this.formularioPaso1!==undefined && this.formularioPaso1?.valid;
   }else{

     this.isValidNextStep = false;
   }
   
  }

  
nextStep() {
  if (this.activeIndex > 0 && this.activeIndexIsPair()) { 
      this.index_imagen_actual++;
  }
  if (this.isValidNextStep){

    this.activeIndex++;
  }
}
  

  onSubmit() {
    throw new Error('Method not implemented.');
  }


}
