import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { expositores } from 'src/app/interfaces/expositores';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { MenuItem } from 'primeng/api';
import { UrlService } from 'src/app/servicios/url/url.service';
import { elementoCreacion } from '../../interfaces/elementoCreacion';
import { muebleCreation } from '../../interfaces/muebleCreacion';


//validador para que el id no sea 0 en categoria
export function idNotZeroValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const categoriaElementos = control.value;
    if (categoriaElementos && categoriaElementos.id === 0) {
      return { 'idNotZero': { value: control.value } };
    }
    return null;
  };
}

@Component({
  selector: 'app-formMueble',
  templateUrl: './formMueble.component.html',
  styleUrls: ['./formMueble.component.css']
})


export class FormMuebleComponent implements OnInit {

  formulario: FormGroup;

  editar_expositor_elementos_index?: number = undefined;
  
  constructor( 
    private urlService: UrlService,
    private cdr: ChangeDetectorRef,
    public dialogConfig : DynamicDialogConfig,
    public dialogRef : DynamicDialogRef,
    private fb: FormBuilder, 
    private muebleService: MueblesService) {

    this.formulario = this.fb.group({
      mueble: this.fb.group({
        id: [],
        nombre_mueble: ['', Validators.required],
        region: [''],
        expositores: this.fb.array([]) // Ahora es un FormArray
      }),
     
    });
   }
  
  //CATEGORIA MODELO
  categoriaID: number = 3;

  //STEPPER
  step_count: number = 2;
  activeIndex:number = 0;
  steps: MenuItem [] | undefined;
  isValidNextStep: boolean = false;
  // rangeArray: number[] = [];

  index_expositor_actual: number = 0;


  objetivo_form: 'crear' | 'editar' = 'crear';

  url_imagenes_referencias: string = this.urlService.url_imagenes_referencia;

  getExpositorFormGroup(index_expositor? :number): FormGroup {
    const index = index_expositor!= undefined ? index_expositor : this.index_expositor_actual;
    
    return this.expositores.at(index) as FormGroup;
    
  }
  

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
  
 
  get imagenesExpositores(): string[] {
    let imagenes: string[] = [];
  
    this.expositores.controls.forEach((expositor) => {
      const atributosExpositores = expositor.get('atributos_expositores') as FormArray;
  
      atributosExpositores.controls.forEach((atributoExpositor) => {
        if (atributoExpositor.get('elemento')) {
          const elemento = atributoExpositor.get('elemento') as FormGroup;
          const categoria = elemento.get('categorias_elementos')?.value;
          const imagen = elemento.get('imagen')?.value;
          if (imagen && categoria.id === this.categoriaID) {
            imagenes.push(imagen);
          }
        }
       
      });
    });
  
    const imagenesUnicas = [...new Set(imagenes)];
   
    return imagenesUnicas;
  }
  

  crearExpositor(modelo: boolean = true, categoria: number, datos?: { imagenes: string, archivos_imagenes: File}) {
    const categoriaID: number = modelo? categoria: this.categoriaID; 
    
    let newExpositor: expositores = {
      nombre: (!!modelo ? 'modelo' : 'elemento') +' del mueble ' + this.nombre_mueble.value,
      atributos_expositores: [] //en caso de no tener datos, no tendrá modelo
    };
        
    if (datos){
       const  atributos_expositores: atributos_expositores []=  [{
          categorias_elementos: {
            id: categoriaID,
          },
          

          elemento:  {
            imagenes: {
              id_imagen: 0,
              url: datos.imagenes
            },
            archivos_imagenes: datos.archivos_imagenes,
            nombre: 'elemento '+datos.archivos_imagenes.name,
            activo: true,
            categorias_elementos: {
              id:categoriaID,
            }
          }
          
        }];
        newExpositor.atributos_expositores = atributos_expositores;
      }
   
    this.agregarExpositor(newExpositor);
  }
  agregarExpositor(expositor?: expositores) {
    const expositorGroup = this.fb.group({
      nombre_expositor: [expositor ? expositor.nombre : '', Validators.required],
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

  crearGrupoAtributoExpositor(atributo: atributos_expositores): FormGroup {
    let imagen:string ='';
    let archivo: File | undefined;
    
    // Verificar y preparar la imagen y el archivo si el atributo viene con un elemento
    if (atributo && atributo.elemento) {
      if (!(atributo.elemento as elementoCreacion).archivos_imagenes) {
        imagen += this.url_imagenes_referencias; 
      } else {
        archivo = (atributo.elemento as elementoCreacion).archivos_imagenes;
      }
      
      imagen += atributo.elemento.imagenes.url;
    }
    
    // Crear el FormGroup para el atributo del expositor
    return this.fb.group({
      id: [atributo && atributo.id ? atributo.id : null],
      x_start: [atributo && atributo.x_start ? atributo.x_start : null],
      y_start: [atributo && atributo.y_start ? atributo.y_start : null],
      alto: [atributo && atributo.alto ? atributo.alto : null],
      ancho: [atributo && atributo.ancho ? atributo.ancho : null],
      angulo: [atributo && atributo.angulo ? atributo.angulo : null],
      elemento: atributo && atributo.elemento ?  this.fb.group({
        id: [ atributo.elemento.id ],
        imagen: [imagen, Validators.required],
        archivos_imagenes: [archivo, Validators.maxLength(2)],
        nombre: [ atributo.elemento.nombre , Validators.required],
        categorias_elementos: [atributo.elemento.categorias_elementos],
      }): null, 
      categorias_elementos: [atributo && atributo.categorias_elementos ? atributo.categorias_elementos : null, [Validators.required, idNotZeroValidator()]],
    });
  }
  

  agregarAtributoAExpositor(expositorIndex: number,  atributo?: atributos_expositores, ) {

   
    //creo formGroup para el atributoExpositor
    const atributoExpositorGroup = this.crearGrupoAtributoExpositor(atributo);
    //Obtengo el expositor correspondiente
    let expositor = this.expositores.at(expositorIndex) as FormGroup; 
    //En caso de que no exista lo creo, debería existir siempre según la lógica, pero por si acaso 
    if (!expositor) {
      this.crearExpositor(false,atributo?.elemento?.categorias_elementos.id);
      expositor = this.expositores.at(expositorIndex) as FormGroup;
    }
    //Obtengo los atributos expositores, por definición no debería ser nulo, pero por si acaso en caso de que no exista, lo creo
    let atributosExpositores = expositor.get('atributos_expositores') as FormArray;
    if (!atributosExpositores) {
      atributosExpositores = new FormArray([]);
      expositor.setControl('atributos_expositores', atributosExpositores);
    }
    //inserto el atributo en el array
    atributosExpositores.push(atributoExpositorGroup);
  
   
  }

  actualizarAtributoExpositor(expositorIndex: number, atributoIndex: number, atributo: atributos_expositores) {
    const expositor = this.expositores.at(expositorIndex) as FormGroup; //obtengo el expositor
    const atributos = expositor.get('atributos_expositores') as FormArray; //obtengo sus atributos
    
    const grupoAtributo = this.crearGrupoAtributoExpositor(atributo); // creo el grupo para el atributo
    atributos.at(atributoIndex).patchValue(grupoAtributo.value); // actualizo el atributo
  }  

  removerAtributoDeExpositor(expositorIndex: number, atributoIndex: number) {
    const expositor = this.expositores.at(expositorIndex) as FormGroup;
    (expositor.get('atributos_expositores') as FormArray).removeAt(atributoIndex);
  }
    

  ngOnInit() {
    if (this.dialogConfig.data) {
      console.log ("editar");
      this.objetivo_form='editar';

      const mueble = this.dialogConfig.data.mueble;

      this.formulario.patchValue({
        mueble: {
          id: mueble.id,
          nombre_mueble: mueble.nombre,
          region: mueble.regiones,
        }
      });

      mueble.expositores.map((expositor :expositores) => {
        
        this.agregarExpositor(expositor);
      });

      
      this.step_count = this.expositores.length+1;
      const index_expositor_a_editar: number = this.dialogConfig.data.showing_asignar_expositores_index;

      if (index_expositor_a_editar!= undefined ) {
        this.editar_expositor_elementos_index = index_expositor_a_editar;
      }


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
              label: 'Selección de posiciones'
            });
            this.steps.push({
              label: 'Asignar elementos'
            });
          }
        }
      }
    }else { // Si es editar
      for (let i = 0; i < this.step_count-1; i++) {
        this.steps.push({
          label: 'Asignar elementos'
        });
      }
    }
 
    this.cdr.detectChanges();
  }


 

  activeIndexIsPair(): boolean {
   return this.activeIndex % 2 === 0;
  }

  updateIsValidNextStepForAsignarElementos(): void {
    const controlExpositor:FormGroup = this.expositores.at(this.index_expositor_actual) as FormGroup;
    const atributo = controlExpositor ? controlExpositor.get('atributos_expositores') : null;
    this.isValidNextStep = !!atributo && atributo.valid;
}

  
  updateIsValidNextStep(): void {
  //EN EL PRIMER PASO
   if (this.activeIndex === 0) {
     this.isValidNextStep = this.nombre_mueble.valid &&  this.region.valid;
    //PARA EL RESTO DE LOS PASOS
   }else{

     //SI ESTOY CREANDO
     if (this.objetivo_form === 'crear') {
        //SI TENGO MODELOS
      if (this.imagenesExpositores.length > 0) {
        //Asignar huecos
        if (!this.activeIndexIsPair()) {
          const atributos = this.expositores.at(this.index_expositor_actual).get('atributos_expositores');
          const numero_huecos = atributos.value.filter(atributo => atributo.alto != null && atributo.ancho != null && atributo.x_start != null && atributo.y_start != null).length;
          this.isValidNextStep = numero_huecos > 0;
          
        } else { 
        
          this.updateIsValidNextStepForAsignarElementos();
        }
 
         //SI NO TENGO MODELOS
      }else{
        this.updateIsValidNextStepForAsignarElementos();
      }
    //SI ESTOY EDITANDO
     }else {
      this.updateIsValidNextStepForAsignarElementos();
     }
   }
   
  }
  
  deleteExpositoresSiEsNecesario() {
    // Será necesario si ya existen expositores pero no existen modelos
 

    
    if (this.imagenesExpositores.length === 0 && this.expositores && this.expositores.length > 0) {

        this.expositores.removeAt(0); // no debería haber mas de uno 𝒸ℴ𝓃𝒸ℯ𝓅𝓉𝓊𝒶𝓁𝓂ℯ𝓃𝓉ℯ
      
    }
  }
  
  onFormularioPaso1AddedImage( $event: { imagenes: string, archivos_imagenes: File }) {
    this.deleteExpositoresSiEsNecesario();

    this.crearExpositor(true,this.categoriaID, $event);
    this.updateStepCount();
    this.generateSteps();
  }
 
  onFormularioPaso1DeletedExpositor($event: number) {
    this.removerExpositor($event);
    this.updateStepCount();
    this.generateSteps();

  }


 

  
  updateStepCount(){
    if (this.objetivo_form === 'crear'){
      this.step_count = this.imagenesExpositores.length== 0 ? 2 : this.imagenesExpositores.length*2+1;
    } else{
      this.step_count = this.imagenesExpositores.length;
    }
  }
  checkFormularioisNotNull(){
    if (this.activeIndex > 0){
      //asignar elementos
      if (this.objetivo_form === 'editar' || (this.objetivo_form === 'crear' && !this.activeIndexIsPair())) {
        if (this.getExpositorFormGroup() == null){
          //creo un formgrupo de expositor vacio
          this.crearExpositor(false,0);
          const expositor = this.expositores.at(0) as FormGroup; //obtengo el formgroup recien creado


          //le inserto un formgroup de atributo_expositor vacio
          const atributoExpositor : atributos_expositores = {
            categorias_elementos: {
              id: 0,
              nombre: ""
            }
          }
          const formAtributoExpositor = this.crearGrupoAtributoExpositor(atributoExpositor); 

          // se ha creado el formgroup, me falta insertarlo

          const atributosExpositores = new FormArray([]);
          expositor.setControl('atributos_expositores', atributosExpositores);

          atributosExpositores.push(formAtributoExpositor);
          
          console.log("mueble", this.mueble.value);
        }

      //seleccion de huecos  
      }
    }
  }
  nextStep() {
    //pasaremos a la siguiente imagen siempre y cuando no estemos en el primer paso y el indice sea par o si estamos en editar
    if ((this.activeIndex > 0 && this.activeIndexIsPair()) || (this.activeIndex > 0 && this.objetivo_form == 'editar')) { 
      this.index_expositor_actual++;
    }

    if (this.isValidNextStep){
      this.activeIndex++;
      this.checkFormularioisNotNull();
      this.updateIsValidNextStep();
    }
    console.log("activeIndex: ",this.activeIndex);
    console.log("expositorIndiex: ",this.index_expositor_actual);
    
  }

  previousStep() {
  
    if ((!this.activeIndexIsPair() && this.objetivo_form == 'crear' ) || (this.objetivo_form == 'editar')) {
      this.index_expositor_actual = Math.max(this.index_expositor_actual - 1, 0);
    }
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.updateIsValidNextStep();
    }
    console.log("activeIndex: ",this.activeIndex);
    console.log("expositorIndiex: ",this.index_expositor_actual);

  }
    
  onSubmit() {
    const mueble:muebleCreation = this.formulario.value.mueble;
    this.muebleService.createMueble(mueble).subscribe(
      (data) => {
         this.dialogRef.close();
      }
    );
  }


}
