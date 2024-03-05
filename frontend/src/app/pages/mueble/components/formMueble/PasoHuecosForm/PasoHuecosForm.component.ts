import { Component, Input, OnInit, Output,EventEmitter,ElementRef} from '@angular/core';
import { categorias_elementos } from 'src/app/interfaces/categoria';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { elementos } from 'src/app/interfaces/elementos';
import { expositores } from 'src/app/interfaces/expositores';
import { Form } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Add this import 

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

  atributos_expositor: atributos_expositores[] = [];

  numero: number = 0;
  
  //

  src: string = '';
  canvasRef: any;
  ctx: any;
  startX: number | null = null;
  startY: number | null = null;
  endX: number | null = null;
  endY: number | null = null;
  lastX: number | null = null;
  lastY: number | null = null;
  deltaX: number | null = null;
  deltaY: number | null = null;
  centro: any;
  WidthHeight: any;

  redimensionado: boolean = false;
  esquinaCogida = null;
  angulo: number | null = null; 
  Rotacion: boolean = false;
  Validar: boolean = false;
  rectanguloDibujado: boolean = false;

  currentX : number;
  currentY: number;

  private stateHistory: any[] = [];

    
// Definición de un tipo para las coordenadas

  constructor(private elementosService: ElementosService, private fb: FormBuilder ) { }


  ngAfterViewInit(): void {

    const canvasElement = document.getElementById('canvas');
    this.ctx = (canvasElement as HTMLCanvasElement).getContext('2d');
    const imageElement = document.getElementById('target-image') as HTMLImageElement;
    this.loadImage(imageElement);
  }
  loadImage(imageElement: HTMLImageElement): void {
    //imageElement.src = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/' + '11.jpg';
    imageElement.src = this.src; //'../../../assets/images/Captura.PNG';
    imageElement.onload = () => {
      const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
      canvasElement.width = imageElement.naturalWidth;
      canvasElement.height = imageElement.naturalHeight;
      this.ctx.drawImage(imageElement, 0, 0);
    };
  }
// Ajustando la función para usar el tipo Coordenada
calcularEsquinasTransformadas(centro: Coordenada, dimensiones: { width: number, height: number }, angulo: number): { [corner: string]: Coordenada } {
  // Esquinas relativas al centro como si estuviera en el origen
  const esquinas: Coordenada[]= [
    { x: -dimensiones.width / 2, y: -dimensiones.height / 2 }, // Superior izquierda
    { x: dimensiones.width / 2, y: -dimensiones.height / 2 },  // Superior derecha
    { x: -dimensiones.width / 2, y: dimensiones.height / 2 },  // Inferior izquierda
    { x: dimensiones.width / 2, y: dimensiones.height / 2 }    // Inferior derecha
  ];

  // Transformar cada esquina
  const esquinasTransformadas = esquinas.map((esquina): Coordenada => {
    // Aplicar rotación
    const xRotado = esquina.x * Math.cos(angulo) - esquina.y * Math.sin(angulo);
    const yRotado = esquina.x * Math.sin(angulo) + esquina.y * Math.cos(angulo);

    // Trasladar de vuelta al centro real
    return {
      x: xRotado + centro.x,
      y: yRotado + centro.y
    };
  });
  // Mapear de vuelta a un objeto para fácil acceso
  return {
    topLeft: esquinasTransformadas[0],
    topRight: esquinasTransformadas[1],
    bottomLeft: esquinasTransformadas[2],
    bottomRight: esquinasTransformadas[3]
  };
}
calcularCentroLateralesTransformados(centro: Coordenada, dimensiones: { width: number, height: number }, angulo: number): { [corner: string]: Coordenada } {
  // Esquinas relativas al centro como si estuviera en el origen
  const lateral: Coordenada[]= [
    { x:0, y: -dimensiones.height / 2 }, // Superior 
    { x: dimensiones.width / 2, y: 0 },  //  derecha
    { x: -dimensiones.width / 2, y: 0 },  // Izq
    { x: 0, y: dimensiones.height / 2 }    // Inferior 
  ];

  // Transformar cada lateral
    const lateralesTransformado = lateral.map((lateral): Coordenada => {
    // Aplicar rotación
    const xRotado = lateral.x * Math.cos(angulo) - lateral.y * Math.sin(angulo);
    const yRotado = lateral.x * Math.sin(angulo) + lateral.y * Math.cos(angulo);

    // Trasladar de vuelta al centro real
    return {
      x: xRotado + centro.x,
      y: yRotado + centro.y
    };
  });

  // Mapear de vuelta a un objeto para fácil acceso
  return {
    Top: lateralesTransformado[0],
    Right: lateralesTransformado[1],
    Left: lateralesTransformado[2],
    Bottom: lateralesTransformado[3]
  };
}


  onMouseDown(event: MouseEvent): void {
    
    this.currentX = event.offsetX;
    this.currentY = event.offsetY;
    if(this.Validar == false ){  
      // Inicialización para un nuevo rectángulo
    //  this.Validar = true;
      this.startX = event.offsetX;
      this.startY = event.offsetY;
      this.centro = this.obtenerCentro(this.startX, this.startY, this.endX, this.endY);        
      this.WidthHeight = this.obtenerWithHeight(this.startX, this.startY, this.endX, this.endY);
      document.addEventListener('mousemove', this.onMouseMove);
    } else {
      
      // Umbral para "agarrar" el rectángulo
      const grabThreshold = 20; // píxeles
  
      // Esquinas del rectángulo en el sistema de coordenadas transformado
      const corners = this.calcularEsquinasTransformadas(this.centro, this.WidthHeight, this.angulo);
      // Comprobar si el clic transformado está cerca de alguna esquina
      for (const [corner, {x, y}] of Object.entries(corners)) { 
            console.log("esquina : ", corner, "x: ", x , "y: ", y)
        if (Math.abs(this.currentX  - x) <= grabThreshold && Math.abs(this.currentY - y) <= grabThreshold) {
            this.redimensionado = false;
            this.Rotacion = true;
            this.esquinaCogida = corner;
            console.log("esquina cogida: ",this.esquinaCogida)
            document.addEventListener('mousemove', this.onMouseMove);
            break;
        }
      }

      const laterales = this.calcularCentroLateralesTransformados(this.centro, this.WidthHeight, this.angulo);
      for(const [lateral, {x, y}] of Object.entries(laterales)) { 
        console.log("lateral : ", lateral, "x: ", x , "y: ", y)
        if (Math.abs(this.currentX  - x) <= grabThreshold && Math.abs(this.currentY - y) <= grabThreshold) {
            this.redimensionado = true;
            this.Rotacion = false;
            this.esquinaCogida = lateral;
            console.log("esquina cogida: ",this.esquinaCogida)
            document.addEventListener('mousemove', this.onMouseMove);
            break;
            
        }
      }
      
    }
 
  }
  
  onMouseMove = (event: MouseEvent) => {
    this.currentX = event.offsetX;
    this.currentY = event.offsetY;
    
    if (this.startX !== null && this.startY !== null) {  
      this.redrawCanvas(); // Apara que no vuelva a dibujar los rectángulos antiguos.
 
      if(this.Rotacion == true){

        this.girarRect()

      }else if(this.redimensionado) {
        this.redimensionarRect();

      }else{
        // Primero, dibujar todo 
        setTimeout(() => {
                  // dibujar el nuevo rectángulo parcial
          this.ctx .strokeStyle = 'rgba(255, 255, 0, 0.4)';
          this.ctx.lineWidth = 3;
          this.ctx.beginPath();
          this.ctx.rect(this.startX, this.startY, this.currentX - this.startX, this.currentY - this.startY);
          this.ctx.stroke();
          this.ctx.closePath();
        },50)


      }

    }
  }


  onMouseUp(event: MouseEvent): void {
    // Eliminar el listener del evento mousemove
    document.removeEventListener('mousemove', this.onMouseMove);

    this.Rotacion = false;
    this.redimensionado = false;
    this.endX = event.offsetX;
    this.endY = event.offsetY;

    if(this.Validar == false){
      this.Validar = true;
      this.Rotacion = true;
      document.addEventListener('mousemove', this.onMouseMove);
    }

 
  }


  

  girarRect(){

    setTimeout(() => { 
    this.WidthHeight = this.obtenerWithHeight(this.startX, this.startY, this.endX, this.endY);
    this.centro= this.obtenerCentro(this.startX, this.startY, this.endX, this.endY);        

    this.ctx.lineWidth = 3;
    this.ctx .strokeStyle = '(255, 255, 0, 0.4)';
    // Calcula la distancia recorrida desde el punto inicial
    const deltaX = this.currentX - this.startX;
    const deltaY = this.currentY - this.startY;

      // ángulo basado en el movimiento del ratón
    this.angulo= Math.atan2(deltaY, deltaX);
   
    // Guardar el estado actual del contexto antes de aplicar transformaciones
    this.ctx.save();

    console.log("posicion del raton: ", this.currentX, this.currentY, " centro rect:", this.centro,  "altura y anchura: ",this.WidthHeight);

    // Mover el origen al centro del rectángulo
    this.ctx.translate(this.centro.x, this.centro.y);

    // Rota el contexto alrededor del centro del rectángulo
    this.ctx.rotate(this.angulo);
    // Dibujar el rectángulo rotado
    this.ctx.rect(-this.WidthHeight.width / 2, -this.WidthHeight.height / 2, this.WidthHeight.width, this.WidthHeight.height);
  //  this.dibujarFlechaDeRedimension(this.startX, this.startY, this.WidthHeight.width, this.WidthHeight.height);
    this.ctx.stroke();
    this.ctx.restore();  // recupera el estado anterior del contexto tras hacer la transformacion
    },70)
  }


  redimensionarRect(){
    setTimeout(() => { 
    switch(this.esquinaCogida) {
      case 'Top':  //'topLeft':
         // this.WidthHeight.width += this.startX - this.currentX;
          this.WidthHeight.height += this.startY - this.currentY;
        //  this.startX = this.currentX;
          this.startY = this.currentY;
          break;
      case 'Right':  //'topRight':
          this.WidthHeight.width = this.currentX - this.startX;
      //    this.WidthHeight.height += this.startY - this.currentY;
          this.startY = this.currentY;
          break;
      case 'Bottom':  //'bottomLeft':
      //    this.WidthHeight.width += this.startX - this.currentX;
          this.WidthHeight.height = this.currentY - this.startY;
          this.startX = this.currentX;
          break;
      case  'Left':  //'bottomRight':
          this.WidthHeight.width += this.startX - this.currentX;
       //   this.WidthHeight.height = this.currentY - this.startY;
          this.startX = this.currentX;
          break;
    } 
        // Calcula el centro del rectángulo
      this.centro.x = this.startX + this.WidthHeight.width / 2;
      this.centro.y = this.startY + this.WidthHeight.height / 2;    

      this.ctx.save();
  
      this.ctx .strokeStyle = 'rgba(255, 255, 0, 0.4)';
      this.ctx.lineWidth = 3;
      // Mover el origen al centro del rectángulo
      this.ctx.translate(this.centro.x, this.centro.y);
  
      // Rota el contexto alrededor del centro del rectángulo
      this.ctx.rotate(this.angulo);
      // Dibujar el rectángulo rotado
      this.ctx.rect(-this.WidthHeight.width / 2, -this.WidthHeight.height / 2, this.WidthHeight.width, this.WidthHeight.height);
    //  this.dibujarFlechaDeRedimension(this.startX, this.startY, this.WidthHeight.width, this.WidthHeight.height);
      this.ctx.stroke();
      this.ctx.restore();  // recupera el estado anterior del contexto tras hacer la transformacion
      
    },100)
  }
 



  drawRectangle(): void {
 
    if (!this.startX || !this.startY || !this.endX || !this.endY) {
      console.error('Incomplete rectangle coordinates.');
      return;
    }

    // Guarda el estado actual del contexto del canvas
    this.ctx.save();

    // Mover el origen al centro del rectángulo para rotación OJO!
    this.ctx.translate(this.centro.x, this.centro.y);

    // Rotar el contexto
    this.ctx.rotate(this.angulo);

    // Configura el color de relleno
    this.ctx.fillStyle = 'rgba(255, 255, 0, 0.4)'; // Por ejemplo, un amarillo semi-transparente

    // Dibujar el rectángulo rotado en el nuevo origen
    this.ctx.beginPath();
    // Asegúrate de ajustar las coordenadas para dibujar desde el centro
    this.ctx.rect(-this.WidthHeight.width / 2, -this.WidthHeight.height / 2, this.WidthHeight.width, this.WidthHeight.height);
    this.ctx.fill(); // Rellena el rectángulo
    this.ctx.stroke(); // Dibuja el borde del rectángulo
    this.ctx.closePath();

    // Restaura el estado original del contexto del canvas
    this.ctx.restore(); 
  }



  clearRectangles(): void {
    this.stateHistory = [];
    this.ngAfterViewInit();
    this.atributos_expositor = [];
    setTimeout(() => {
      for (const state of this.stateHistory) {
        this.ctx.putImageData(state, 0, 0);
      }
    }, 20);
  }

  resetCoordinates(): void {
    this.startX = null;
    this.startY = null;
    this.endX = null;
    this.endY = null;
    this.angulo = null;
  }


  saveState(): void {
    this.stateHistory.push(this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height));

  }

  undoLastAction(): void {
    if (this.stateHistory.length >= 0) {
      const lastState = this.stateHistory.pop();
      this.atributos_expositor.pop();
      this.ctx.putImageData(lastState, 0, 0);
    } else {
      console.warn('No more actions to undo');
    }
    this.redrawCanvas();
  }

  redrawCanvas(): void {
    this.ngAfterViewInit();
 
    setTimeout(() => {
      for (const state of this.stateHistory) {
        this.ctx.putImageData(state, 0, 0);
      }
    }, 20);

  }

  validarRect(): void {
    this.Validar = false;
    
    this.drawRectangle();

    const atributo: atributos_expositores  = {
      id: this.atributos_expositor.length + 1,
      expositor: null,
      categorias_elementos: null,
      elemento: null,
      x_start: this.startX,
      y_start: this.startY,
      ancho: this.WidthHeight.width,
      alto: this.WidthHeight.height,
      angulo: this.angulo
  
    };

    this.atributos_expositor.push(atributo);

    this.add_atributo_expositor(atributo);
    console.log(this.expositorFormulario)

    this.numero = this.atributos_expositor.length;

    this.saveState(); 
    this.resetCoordinates();
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

  obtenerCentro(xStart: number, yStart: number, xEnd: number, yEnd: number): {x: number, y: number} {
    return{
      x: Math.abs(xStart + xEnd) / 2,
      y: Math.abs(yStart + yEnd) / 2

    }
  }
  obtenerWithHeight(xStart: number, yStart: number, xEnd: number, yEnd: number): {width: number, height: number} {
    return{
      width: Math.abs(xStart - xEnd),
      height: Math.abs(yStart - yEnd)
    }
  }

  inicializaCategoriasElementos(){
    this.elementosService.getCategorias_elementos().subscribe((categorias: categorias_elementos[]) => {
      this.categorias_elementos = categorias;
      this.categoriaSeleccionada = this.categorias_elementos[0].nombre;
    })
  }

  eliminarElemento(atributo: atributos_expositores){
    const control = <FormArray>this.expositorFormulario.get('atributos_expositores') as FormArray;
    for (const group of control.controls) {
      if (group?.value.id === atributo.id) {
        control.removeAt(control.controls.indexOf(group));
        this.atributos_expositor = this.atributos_expositor.filter((element) => element !== atributo);
      }
    }
  }



                                    //////////////////////////////////////////////////////////////////

  ngOnInit() {                                     
    console.log(this.expositorFormulario.value);
    this.src = this.imagenExpositor;

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
  
  
   
    if (!!this.atributos_expositores) {
      for (let i = 0; i < this.atributos_expositores.controls.length; i++) {
        const atributoExpositor = this.atributos_expositores.controls[i];
        const elemento = atributoExpositor.get('elemento') as FormGroup;
        const imagen = elemento.get('imagen')?.value;
        const categoria = elemento.get('categoria_elementos')?.value;
        
        if (categoria !== undefined && categoria !== null &&categoria.id === 3  ) {
          return imagen ;
        }
      }
      
    }
    return undefined;
   
  }
 
}
