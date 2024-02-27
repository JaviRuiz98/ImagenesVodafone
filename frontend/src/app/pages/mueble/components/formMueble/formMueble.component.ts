import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { muebles } from 'src/app/interfaces/muebles';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { expositores } from 'src/app/interfaces/expositores';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { MenuItem } from 'primeng/api';
import { UrlService } from 'src/app/servicios/url/url.service';


@Component({
  selector: 'app-formMueble',
  templateUrl: './formMueble.component.html',
  styleUrls: ['./formMueble.component.css']
})

export class FormMuebleComponent implements OnInit {


 
  
  constructor( private urlService: UrlService, private cdr: ChangeDetectorRef, public dialogConfig : DynamicDialogConfig, private fb: FormBuilder, private elementosService: ElementosService, private muebleService: MueblesService) { }
  
  objetivo_form: 'crear' | 'editar' = 'crear';

  url_imagenes_referencias: string = this.urlService.url_imagenes_referencia;

  formulario = this.fb.group({
    mueble: this.fb.group({
      nombre_mueble: ['', Validators.required],
      region: [''],
      expositores: this.fb.array([]) // Ahora es un FormArray
    }),
    archivos_imagenes: [ [], Validators.maxLength(2)],
  });

  get mueble() {
    return this.formulario.get('mueble') as FormGroup;
  }
  get nombre_mueble() {
    return this.mueble.get('nombre_mueble');
  }
  get region() {
    return this.mueble.get('region');
  }
  
  get expositores() {
    return this.mueble.get('expositores') as FormArray;
  }
  
  get archivosImagenes() {
    return this.formulario.get('archivos_imagenes') as FormArray;
  }
  get imagenesExpositores(): string[] {
    return this.expositores.controls.map((expositor) => {
      return expositor.get('imagen')?.value || ''; 
    });
  }
  


  agregarExpositor(expositor?: expositores) {
    const expositorGroup = this.fb.group({
      nombre_expositor: [expositor ? expositor.nombre : '', Validators.required],
      imagen: [expositor ? this.getImagenModelo(expositor) : ''],
      atributos_expositores: this.fb.array([])
    });
  
    this.expositores.push(expositorGroup);
  
    if (expositor && expositor.atributos_expositores) {
      const index = this.expositores.length - 1;
      expositor.atributos_expositores.forEach((atributo) => {
        this.agregarAtributoAExpositor(index, atributo);
      });
    }
  }

  removerExpositor(index: number) {
    this.expositores.removeAt(index);
  }

  agregarAtributoAExpositor(expositorIndex: number, atributo?: atributos_expositores) {
    const atributoExpositorGroup = this.fb.group({
      elemento: [atributo ? atributo.elemento.id : 0, Validators.maxLength(2)],
    });
    const expositor = this.expositores.at(expositorIndex) as FormGroup;
    (expositor.get('atributos_expositores') as FormArray).push(atributoExpositorGroup);
  }

  removerAtributoDeExpositor(expositorIndex: number, atributoIndex: number) {
    const expositor = this.expositores.at(expositorIndex) as FormGroup;
    (expositor.get('atributos_expositores') as FormArray).removeAt(atributoIndex);
  }
    

  //STEPPER
  step_count: number = 2;
  activeIndex:number = 0;
  steps: MenuItem [] | undefined;
  isValidNextStep: boolean = false;
  rangeArray: number[] = [];

  index_expositor_actual: number = 0;
  
  mueble_existente: muebles = {
    id: 0,
    nombre: '',
    regiones: {
      id: 0,
      nombre: ''
    },
    expositores: []
  };
  
  ngOnInit() {
    if (this.dialogConfig.data) {
      console.log ("editar");
      this.objetivo_form='editar';

      const mueble = this.dialogConfig.data.mueble;

      this.formulario.patchValue({
        mueble: {
          nombre_mueble: mueble.nombre,
          region: mueble.regiones,
        }
      });

      mueble.expositores.map((expositor :expositores) => {
        this.agregarExpositor(expositor);
      });

      
      this.step_count = this.expositores.length;

  
    }else{
      console.log ("nuevo");
      this.objetivo_form='crear';
    }

     // Genera los pasos iniciales
     this.generateSteps();
     this.updateIsValidNextStep();

     this.formulario.valueChanges.subscribe(() => {
       console.log(this.formulario.value);
       this.updateIsValidNextStep();
     })
     
  }

  generateSteps() {
    this.steps = [
      {
        label: 'Base'
      }
    ];
    
    if (this.objetivo_form === 'crear') {
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
    }else { // Si es editar
      for (let i = 0; i < this.step_count; i++) {
        this.steps.push({
          label: 'Asignar elementos'
        });
      }
    }
 
    this.cdr.detectChanges();
    this.rangeArray= this.generateRangeArray(0,this.step_count-1);
  }

  generateRangeArray(start: number, end: number): number[] {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx);
  }
  

  getImagenModelo(expositor: expositores): string | undefined {
    const atributoModelo: atributos_expositores | undefined = expositor.atributos_expositores.find((atributo) => atributo.categorias_elementos.id === 3);

    
    if (atributoModelo && atributoModelo.elemento) {
      return this.url_imagenes_referencias+atributoModelo.elemento.imagenes.url;
    } else {
      return undefined;
    }

  }


  activeIndexIsPair(): boolean {
   return this.activeIndex % 2 === 0;
  }

  
  updateIsValidNextStep(): void {
   if (this.activeIndex === 0) {
     this.isValidNextStep = this.nombre_mueble.valid &&  this.region.valid;

   }else{

     this.isValidNextStep = false;
   }
   
  }
  
  onFormularioPaso1AddedImage() {

    if (this.objetivo_form === 'crear'){
      this.step_count = this.imagenesExpositores.length== 0 ? 2 : this.imagenesExpositores.length*2+1;
    } else{
      this.step_count = this.imagenesExpositores.length;
    }
    this.generateSteps();
 
  }

  
  nextStep() {
    //pasaremos a la siguiente imagen siempre y cuando no estemos en el primer paso y el indice sea par o si estamos en editar
    if ((this.activeIndex > 0 && this.activeIndexIsPair()) || (this.activeIndex > 0 && this.objetivo_form == 'editar')) { 
        this.index_expositor_actual++;
    }

    if (this.isValidNextStep){
      this.activeIndex++;
    }
  }


  previousStep() {
  
    if ((!this.activeIndexIsPair() && this.objetivo_form == 'crear' ) || (this.objetivo_form == 'editar')) {
      this.index_expositor_actual = Math.max(this.index_expositor_actual - 1, 0);
    }
  if (this.activeIndex > 0) {
    this.activeIndex--;
  }
  }
    

  onSubmit() {
    // const atributos: atributos_expositores[];
    // for (let i = 0; i < this.formularioPaso1.value.archivo.length; i++) {
      
    // }

    // const expositor : expositores = {
    //   nombre: 'expositor de '+ this.formularioPaso1.value.nombre,
    //   atributos_expositores: atributos;
    // }
  }


}
