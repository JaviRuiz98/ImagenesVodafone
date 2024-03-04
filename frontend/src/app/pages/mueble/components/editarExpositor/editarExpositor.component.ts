import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { elementos } from 'src/app/interfaces/elementos';
import { expositores } from 'src/app/interfaces/expositores';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';


type Punto = { x: number; y: number };

@Component({
  selector: 'app-editarExpositor',
  templateUrl: './editarExpositor.component.html',
  styleUrls: ['./editarExpositor.component.css']
})
export class EditarExpositorComponent implements OnInit {

  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';
  imageElement: HTMLImageElement;


  constructor( public dialogConfig : DynamicDialogConfig, private muebleService : MueblesService, public messageService : MessageService) { }

  expositor: expositores = {
    id: 0,
    nombre: '',
    atributos_expositores: [],
  }

  dragged_elemento?: elementos;
  previous_state: atributos_expositores[] = [];
  canvasRef?: HTMLCanvasElement;
  ctx: any;

  

  ngOnInit() {
    this.inicializarComponente();
  
  }

  inicializarComponente(){
    if (this.dialogConfig.data) {
      this.expositor = this.dialogConfig.data.expositor;

      this.canvasRef = document.getElementById('canvas') as HTMLCanvasElement;
      this.ctx = this.canvasRef.getContext('2d');
      this.previous_state = this.expositor.atributos_expositores;

      const imageElement = this.getImagenModelo();
      this.loadImage(imageElement);

      this.configurarEventosCanvas();
    }
  }
  configurarEventosCanvas(){
    if (!this.canvasRef) return;

     // Permitir drop en el canvas
     this.canvasRef.addEventListener('dragover', (event) => {
      event.preventDefault(); 
      // para que cambie el rectángulo al pasar el ratón con un elemento
      this.effectSelectable( event); 
    });

     this.canvasRef.addEventListener('drop', (event) => {
      this.handleCanvasDrop(event);
    });
  }


  loadImage(imageElementSrc: string): void {
    this.imageElement = new Image(); 
    this.imageElement.onload = () => {
      const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
      canvasElement.width =  this.imageElement.naturalWidth;
      canvasElement.height =  this.imageElement.naturalHeight;
        this.ctx.drawImage( this.imageElement, 0, 0); 
        this.drawRecangles();
    };
    this.imageElement.src = imageElementSrc; 
  }

  drawRecangles(){
    this.limpiarCanvas();
    this.expositor.atributos_expositores.forEach(attr => {
      this.drawRecangle('rgba(0,0,0,1)', 'rgba(255,255,255,0.5)', attr);
      this.drawCross(attr);
    });
  }

  puntoDentroRectangulo(punto: Punto, rectStart: Punto, width: number, height: number,angle: number): boolean {
    // Calcula el centro del rectángulo
    const centerX = rectStart.x + width / 2;
    const centerY = rectStart.y + height / 2;

    // Traslada el punto al origen para la rotación
    const translatedX = punto.x - centerX;
    const translatedY = punto.y - centerY;

    // Aplica la rotación inversa
    const cosAngle = Math.cos(-angle);
    const sinAngle = Math.sin(-angle);

    const rotatedX = translatedX * cosAngle - translatedY * sinAngle;
    const rotatedY = translatedX * sinAngle + translatedY * cosAngle;

    // Verifica si el punto está dentro del rectángulo
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    return rotatedX >= -halfWidth && rotatedX <= halfWidth &&
           rotatedY >= -halfHeight && rotatedY <= halfHeight;
}


  handleCanvasDrop(event: DragEvent) {
    event.preventDefault();
    if (!this.canvasRef || !this.ctx) return;

    const rect = this.canvasRef.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const elementoData = event.dataTransfer?.getData("text");
    const elemento: elementos = elementoData ? JSON.parse(elementoData) : null;

    if (!elemento) {
      this.restaurarEstadoPrevio();
      return;
    }


    // --  pacolino
    const currentX = event.offsetX;
    const currentY = event.offsetY;
    const puntoSoltado = { x: currentX, y: currentY };



    //const indiceSoltado = this.expositor.atributos_expositores.findIndex(attr => x >= attr.x_start && x <= attr.x_max && y >= attr.y_min && y <= attr.y_max);
    const indiceSoltado = this.expositor.atributos_expositores.findIndex(attr => this.puntoDentroRectangulo( puntoSoltado, {x: attr.x_start, y: attr.y_start}, attr.ancho, attr.alto, attr.angulo  ));  //punto: Punto, rectStart: Punto, width: number, height: number,angle: number): boolean {
    // -- linopaco

    if (indiceSoltado !== -1) {
      const categoria_hueco = this.expositor.atributos_expositores[indiceSoltado].categorias_elementos;
      if (categoria_hueco.id!== elemento.categorias_elementos.id) {
        this.messageService.add({ key: 'edit', severity: 'error', summary: 'Error', detail: 'La categoría permitida para esta posición es ' + categoria_hueco.nombre });
        this.restaurarEstadoPrevio();
        return;
      }
      this.actualizarExpositor(indiceSoltado, elemento);
    } else {
      this.restaurarEstadoPrevio();
    }

  }

  drawDeleteButton(x, y, width, height) {
    const btnImage = new Image();
    btnImage.onload = () => {
      const btnSize = 20; // Tamaño del botón
      const padding = 5; // Espacio desde la esquina
      this.ctx.drawImage(btnImage, x + width - btnSize - padding, y + padding, btnSize, btnSize);
    };
    btnImage.src = 'path/to/delete-icon.png'; // Ruta al icono de eliminación
  }

  
  actualizarExpositor(indice: number, elemento: elementos) {
    this.previous_state = this.expositor.atributos_expositores;
    this.expositor.atributos_expositores[indice].elemento = elemento;
    const droppedOn = this.expositor.atributos_expositores[indice];

    this.updateExpositor();
    this.drawImage(droppedOn);
    this.drawRecangles();
  }

  restaurarEstadoPrevio() {
    this.expositor.atributos_expositores = JSON.parse(JSON.stringify(this.previous_state));
    this.drawRecangles();
  }

  guardarEstadoPrevio() {
    this.previous_state = JSON.parse(JSON.stringify(this.expositor.atributos_expositores));
  }


  private getImagenModelo(): string | undefined {
    const atributoModelo: atributos_expositores | undefined = this.expositor.atributos_expositores.find((atributo) => atributo.categorias_elementos.id === 3);
    
    if (atributoModelo && atributoModelo.elemento) {
      console.log("imagen: "+atributoModelo.elemento.imagenes.url);
      return this.url_imagenes_referencias+atributoModelo.elemento.imagenes.url;
    } else {
      return undefined;
    }

  }
  private drawCross( state: atributos_expositores) {
     // Dibuja un "+" en el centro del rectángulo
     this.ctx.strokeStyle = 'rgba(0, 0, 0)';
     this.ctx.lineWidth = 1;
     this.ctx.setLineDash([0,0]); 
     const centerX = state.x_start + ((state.ancho )/ 2); 
     const centerY = state.y_start + ((state.alto )/ 2); 
     const crossSize = 0.1*Math.min(state.alto, state.ancho);
     this.ctx.beginPath();

     this.ctx.moveTo(centerX - crossSize, centerY); // Mueve a la izquierda del centro
     this.ctx.lineTo(centerX + crossSize, centerY); // Dibuja hacia la derecha del centro

     this.ctx.moveTo(centerX, centerY - crossSize); // Mueve arriba del centro
     this.ctx.lineTo(centerX, centerY + crossSize); // Dibuja hacia abajo del centro

     this.ctx.stroke();
     this.ctx.closePath();

  }
  private drawRecangle(bordercolor: string , fillcolor: string , state: atributos_expositores) {
   
      this.ctx.strokeStyle = bordercolor;
      this.ctx.st
      this.ctx.lineWidth = 3;
      this.ctx.setLineDash([5, 5]); // Define el patrón de trazo discontinuo
  
      const xMin = state.x_start;
      const yMin = state.y_start; 
      const width = state.ancho
      const height = state.alto;
  
  
      this.ctx.beginPath();
      this.ctx.rect(xMin, yMin, width, height);
      this.ctx.fillStyle = fillcolor;
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    if (state.elemento) {
      this.drawImage(state);
    }
       
      
    
   
  }
  drawImage( state: atributos_expositores) {
    const imageElement = new Image();

      imageElement.onload = () => {
            const width = state.ancho;
            const height = state.alto;
            this.ctx.drawImage(imageElement, state.x_start, state.y_start, width, height);
          };
      imageElement.src = this.url_imagenes_referencias + state.elemento.imagenes.url;
  }

  redibujarCanvasYRectangulos() {
    this.limpiarCanvas();
    this.drawRecangles(); // Asegúrate de que esta función redibuja basándose en el estado actual de `this.expositor.atributos_expositores`
  }
  
  limpiarCanvas() {
    if (this.canvasRef && this.ctx) {
      this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
      this.ctx.drawImage(this.imageElement, 0, 0);
    }
  }
  
  effectSelectable(  event: DragEvent) {
      
    const rect =  this.canvasRef.getBoundingClientRect();
    const x = event.clientX - rect.left; // X dentro del canvas
    const y = event.clientY - rect.top;  // Y dentro del canvas

 
    
    const state = this.expositor.atributos_expositores.find(state => {
      //return x >= state.x_min && x <= state.x_max && y >= state.y_min && y <= state.y_max;
      return this.puntoDentroRectangulo({x: x, y: y}, {x: state.x_start, y: state.y_start}, state.ancho, state.alto, state.angulo);
    });

      if (state) {
       this.drawRecangle( 'rgba(255,0,0, 1)' ,'rgba(221, 221, 221, 1)', state);
       this.drawCross(state);
      }
     

      
  }

  onDragStart(event: {dragEvent: DragEvent, elemento: elementos}) {
   event.dragEvent.dataTransfer.setData("text", JSON.stringify(event.elemento));
   this.dragged_elemento = event.elemento;

  }
  onDragEnd(event:{dragEvent:  CdkDragDrop<string[]>}) {
    console.log("terminar");
  }
  private updateExpositor() {
    this.muebleService.updateExpositor(this.expositor).subscribe();
  }

  eliminarImagen (indice: number) {
    console.log(indice);
  }
  
  


}
