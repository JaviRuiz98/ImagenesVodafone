import { Component, Input, OnInit, Output,EventEmitter,ElementRef} from '@angular/core';
import { categorias_elementos } from 'src/app/interfaces/categoria';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { fabric } from 'fabric';

type Coordenada = {
  x: number;
  y: number;
};


@Component({
  selector: 'app-PasoHuecosForm',
  templateUrl: './PasoHuecosForm.component.html',
  styleUrls: ['./PasoHuecosForm.component.css']
})
export class PasoHuecosFormComponent implements OnInit {

  @Input() expositorFormulario: FormGroup; 


  categoriaSeleccionada?: string;  
  opcionesCategoria: string[] = [];
  categorias_elementos: categorias_elementos[]; // inicializar

  atributos_expositor: atributos_expositores[] = []; // huecos

  numero: number = 0;
  
  array_rectangulos: any[] = [];
  canvas: fabric.Canvas;
  contadorHuecos = 0; // atributos_expositores
  id: number = 0;
  //

  src: string = '';

  private stateHistory: any[] = [];

    
// Definición de un tipo para las coordenadas

  constructor(private elementosService: ElementosService, private fb: FormBuilder ) { }

  anadirRectangulo() {
    // Primero, dibujar todo 
    this.id++;

    // this.array_rectangulos[this.array_rectangulos.length] = new fabric.Rect({
    const rect = new fabric.Rect({
      left: 100 ,  // startX // Posición inicial en el eje X
      top: 100, //startY // Posición inicial en el eje Y
      fill: 'yellow', // Color de relleno
      width:  50, // Math.abs(startX - currentX), // Ancho inicial
      height: 70,  // Math.abs(startY - currentY), // Alto inicial
      angle: 0, // Ángulo inicial (sin rotación)
      cornerStyle: 'circle', // Estilo de los controles de esquina para redimensionar/rotar
      borderColor: 'black', // Color del borde cuando el objeto está seleccionado
      cornerColor: 'blue', // Color de las esquinas cuando el objeto está seleccionado
      cornerSize: 8, // Tamaño de las esquinas para facilitar la manipulación
      transparentCorners: false, // Esquinas no transparentes para mejor visibilidad
      hasRotatingPoint: true, // Permite la rotación con el control situado fuera del rectángulo
      opacity: 0.5, // Establece la opacidad del rectángulo para hacerlo casi transparente
      
    });
        // Añade el rectángulo al canvas
    this.canvas.add(rect);
    this.array_rectangulos.push({rect, id: this.id});


    
    // Hace que el rectángulo añadido sea el objeto activo para su edición inmediata
    this.canvas.setActiveObject(rect);

    this.atributos_expositor.push({
      id: this.id,
      expositor: null,
      categorias_elementos: null,
      elemento: null,
      x_start: rect.left,
      y_start: rect.top,
      ancho: rect.width,
      alto: rect.height,
      angulo: rect.angle
    }); 

    //añado al formgroup
    this.add_atributo_expositor(this.atributos_expositor[this.atributos_expositor.length - 1]);


    // Escuchar eventos de modificación en el rectángulo
    rect.on('modified', () => {
      const index = this.atributos_expositor.findIndex(m => m.id === this.id); // Encuentra el hueco por ID
      if (index !== -1) {
        // Actualiza los datos del mueble en el arreglo
        this.atributos_expositor[index].x_start =rect.left;
        this.atributos_expositor[index].y_start = rect.top;
        this.atributos_expositor[index].ancho = rect.getScaledWidth();
        this.atributos_expositor[index].alto = rect.getScaledHeight();
        this.atributos_expositor[index].angulo = rect.angle;
      }
    });


  }
 




  clearRectangles(): void {
    this.stateHistory = [];
   // this.ngAfterViewInit();
    for(let i = 0; i < this.array_rectangulos.length; i++){
      this.canvas.remove(this.array_rectangulos[i].rect);


    }
    this.atributos_expositor = [];
    
    
    
  }
 

  undoLastAction(): void {
    if (this.stateHistory.length >= 0) {
      const lastState = this.stateHistory.pop();
      this.atributos_expositor.pop();


      const rect = this.array_rectangulos.pop();
      this.canvas.remove(rect.rect);

      const control = <FormArray>this.expositorFormulario.get('atributos_expositores') as FormArray;
      control.removeAt(control.length - 1);
      


      
    } else {
      console.warn('No more actions to undo');
    }
    
  }


  

  onSelectElemento(atributo: atributos_expositores) {
    const control = <FormArray>this.expositorFormulario.get('atributos_expositores') as FormArray;
    for (const group of control.controls) {
      if (group?.value.id === atributo.id) { 
     
        group.patchValue({categorias_elementos: atributo.categorias_elementos});

        console.log(atributo);
      }
    }
  }


  inicializaCategoriasElementos(){
    this.elementosService.getCategorias_elementos().subscribe((categorias: categorias_elementos[]) => {
      this.categorias_elementos = categorias;
      this.categoriaSeleccionada = this.categorias_elementos[0].nombre;
    })
  }

  eliminarElemento(atributo: atributos_expositores){

    var rect = this.array_rectangulos.find(rect => rect.id === atributo.id);

    const control = <FormArray>this.expositorFormulario.get('atributos_expositores') as FormArray;
    for (const group of control.controls) {
      if (group?.value.id === atributo.id) {
        this.canvas.remove(rect.rect);
        control.removeAt(control.controls.indexOf(group));
        this.atributos_expositor = this.atributos_expositor.filter((element) => element !== atributo);
        this.array_rectangulos = this.array_rectangulos.filter((element) => element !== rect);
      }
    }
  }



                                    //////////////////////////////////////////////////////////////////

  ngOnInit() {        
    // this.validar = false;                             
    console.log(this.expositorFormulario.value);
    this.src = this.imagenExpositor;
     

    this.canvas = new fabric.Canvas('canvas', {

      backgroundColor: 'lightgrey',

    });

    fabric.Image.fromURL(this.src, (img) => {
      img.scaleToWidth(this.canvas.getWidth());
      img.scaleToHeight(this.canvas.getHeight());
      this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas), {
        scaleX: this.canvas.width / img.width,
        scaleY: this.canvas.height / img.height,
      });
    });
    this.inicializaCategoriasElementos();
  }

 
  get nombre_expositor() {
    return this.expositorFormulario? this.expositorFormulario.get('nombre_expositor'): undefined;
  }


  get atributos_expositores() {
    return this.expositorFormulario?this.expositorFormulario.get('atributos_expositores') as FormArray : undefined;
  }

  get atributo_expositor() {
    const atributo = this.expositorFormulario?this.expositorFormulario.get('atributos_expositores') : undefined;
    return atributo;
  }

  add_atributo_expositor(atributo: atributos_expositores): void {
    const control = <FormArray>this.expositorFormulario.controls['atributos_expositores'];
    control.push(this.fb.group({ id: atributo.id, expositor: atributo.expositor, categorias_elementos: atributo.categorias_elementos, elemento: atributo.elemento, 
    x_start: atributo.x_start, y_start: atributo.y_start, ancho: atributo.ancho, alto: atributo.alto, angulo: atributo.angulo }));

    console.log(this.expositorFormulario.value);
  }



 
  get imagenExpositor(): string {

    if (this.atributos_expositores) {
      for (let atributoExpositor of this.atributos_expositores.controls) {
        const elemento = atributoExpositor.get('elemento') as FormGroup;
        const categoria = elemento.get('categorias_elementos')?.value;
        const imagen = elemento.get('imagen')?.value;
        if (imagen && categoria && categoria.id === 3) {
          return imagen; 
        }
      }
    }
    return undefined;
  }
 
}
