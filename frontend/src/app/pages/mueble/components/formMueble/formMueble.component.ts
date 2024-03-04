import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { expositores } from 'src/app/interfaces/expositores';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { MenuItem } from 'primeng/api';
import { UrlService } from 'src/app/servicios/url/url.service';
import { elementoCreacion } from '../../interfaces/elementoCreacion';


@Component({
  selector: 'app-formMueble',
  templateUrl: './formMueble.component.html',
  styleUrls: ['./formMueble.component.css']
})

export class FormMuebleComponent implements OnInit {

  formulario: FormGroup;
  
  constructor( private urlService: UrlService, private cdr: ChangeDetectorRef, public dialogConfig : DynamicDialogConfig, private fb: FormBuilder, private elementosService: ElementosService, private muebleService: MueblesService) {
    this.formulario = this.fb.group({
      mueble: this.fb.group({
        nombre_mueble: ['', Validators.required],
        region: [''],
        expositores: this.fb.array([]) // Ahora es un FormArray
      }),
     
    });
   }
  
  
  //STEPPER
  step_count: number = 2;
  activeIndex:number = 0;
  steps: MenuItem [] | undefined;
  isValidNextStep: boolean = false;
  rangeArray: number[] = [];

  index_expositor_actual: number = 0;


  objetivo_form: 'crear' | 'editar' = 'crear';

  url_imagenes_referencias: string = this.urlService.url_imagenes_referencia;

  getExpositorFormGroup(): any {
    return this.expositores.at(this.index_expositor_actual) as FormGroup;
    
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
        
        const elemento = atributoExpositor.get('elemento') as FormGroup;
        const categoria: number = elemento.get('categoria_elementos')?.value;
        const imagen = elemento.get('imagen')?.value;
        if (imagen && categoria === 3) {
          imagenes.push(imagen);
        }
      });
    });
  
    const imagenesUnicas = [...new Set(imagenes)];
   
    return imagenesUnicas;
  }
  

  crearExpositor(modelo: boolean = true, categoria: number, datos?: { imagenes: string, archivos_imagenes: File}) {
    const categoriaID: number = modelo? categoria: 3; // 3 es de modelo, me gustaría no tenerlo harcodeado
    
    let newExpositor: expositores = {
      nombre: (!!modelo ? 'modelo' : 'elemento') +' del mueble ' + this.nombre_mueble.value,
      atributos_expositores: [] //en caso de no tener datos, no tendrá modelo
    };
        
    if (datos){
       const  atributos_expositores: atributos_expositores []=  [{
          categorias_elementos: {
            id: 3,
          },
          elemento:  {
            imagenes: {
              id_imagen: 0,
              url: datos.imagenes
            },
            archivo_imagen: datos.archivos_imagenes,
            nombre: 'elemento '+datos.archivos_imagenes.name,
            activo: true,
            categorias_elementos: {
              id:3,
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
        this.agregarAtributoAExpositor(index, undefined, atributo);
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
      if (!(atributo.elemento as elementoCreacion).archivo_imagen) {
        imagen += this.url_imagenes_referencias; 
      } else {
        archivo = (atributo.elemento as elementoCreacion).archivo_imagen;
      }
      
      imagen += atributo.elemento.imagenes.url;
    }
    

    // Crear el FormGroup para el atributo del expositor
    return this.fb.group({
      elemento: this.fb.group({
        id: [atributo && atributo.elemento ? atributo.elemento.id : 0],
        imagen: [imagen, Validators.required],
        archivos_imagenes: [archivo, Validators.maxLength(2)],
        categoria_elementos: [atributo && atributo.elemento ? atributo.elemento.categorias_elementos.id : null],
      })
    });
  }
  

  agregarAtributoAExpositor(expositorIndex: number, atributo_index?:number, atributo?: atributos_expositores, ) {

    // si me pasan el index de la posicion del atributo, se actualiza
    if  (atributo_index!= undefined ) {
      this.actualizarAtributoExpositor(expositorIndex, atributo_index, atributo);
   
      // si no me pasan el index de la posicion del atributo, se crea un nuevo atributo_expositor y se inserta
    }else {
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
          nombre_mueble: mueble.nombre,
          region: mueble.regiones,
        }
      });

      mueble.expositores.map((expositor :expositores) => {
        
        this.agregarExpositor(expositor);
      });

      
      this.step_count = this.expositores.length;
      console.log(this.mueble.value);
  
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

 

  activeIndexIsPair(): boolean {
   return this.activeIndex % 2 === 0;
  }

  updateIsValidNextStepForAsignarElementos(): void {
    const atributo = this.expositores[this.activeIndex]? this.expositores[this.activeIndex].get('atributos_expositores') : null;
    !!atributo && atributo.valid   ? this.isValidNextStep = true : this.isValidNextStep = false;
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
        if (this.activeIndexIsPair()) {
         
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
  
 
  onFormularioPaso1AddedImage( $event: { imagenes: string, archivos_imagenes: File }) {
    this.crearExpositor(true,3, $event);
    this.updateStepCount();
    this.generateSteps();
  }
 
  onFormularioPaso1DeletedExpositor($event: number) {
    this.removerExpositor($event);
    this.updateStepCount();
    this.generateSteps();

  }


  onCrearAtributoExpositor($event:{index:number, atributo: atributos_expositores}) {
    this.agregarAtributoAExpositor(this.index_expositor_actual , $event.index, $event.atributo, );
    this.updateIsValidNextStep();
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
      }else{

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
      this.checkFormularioisNotNull()
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
    console.log("guardar",this.formulario.value);
  }


}
