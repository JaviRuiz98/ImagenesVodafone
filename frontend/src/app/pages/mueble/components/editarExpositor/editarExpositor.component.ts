import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { elementos } from 'src/app/interfaces/elementos';
import { expositores } from 'src/app/interfaces/expositores';

@Component({
  selector: 'app-editarExpositor',
  templateUrl: './editarExpositor.component.html',
  styleUrls: ['./editarExpositor.component.css']
})
export class EditarExpositorComponent implements OnInit {

  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';
  imageElement: HTMLImageElement;

  constructor( public dialogConfig : DynamicDialogConfig) { }

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

    const indiceSoltado = this.expositor.atributos_expositores.findIndex(attr => x >= attr.x_min && x <= attr.x_max && y >= attr.y_min && y <= attr.y_max);

    if (indiceSoltado !== -1) {
      this.actualizarExpositor(indiceSoltado, elemento);
    } else {
      this.restaurarEstadoPrevio();
    }

  }

  
  actualizarExpositor(indice: number, elemento: elementos) {
    this.previous_state = this.expositor.atributos_expositores;
    this.expositor.atributos_expositores[indice].elemento = elemento;
    const droppedOn = this.expositor.atributos_expositores[indice];
   
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
    const atributoModelo: atributos_expositores | undefined = this.expositor.atributos_expositores.find((atributo) => atributo.id_categoria === 3);
    
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
     const centerX = (state.x_min + state.x_max) / 2; 
     const centerY = (state.y_min + state.y_max) / 2; 
     const crossSize = 0.1*Math.min(state.x_max - state.x_min, state.y_max - state.y_min);
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
  
      const xMin = state.x_min;
      const yMin = state.y_min; 
      const width = state.x_max - state.x_min; 
      const height = state.y_max - state.y_min;
  
  
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
            const width = state.x_max - state.x_min;
            const height = state.y_max - state.y_min;
            this.ctx.drawImage(imageElement, state.x_min, state.y_min, width, height);
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
      return x >= state.x_min && x <= state.x_max && y >= state.y_min && y <= state.y_max;
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
  onDragEnd(event:{dragEvent: DragEvent}) {
    console.log("terminar");
  }
  private updateExpositor() {
    //llamar al back para actualizar
  }

  
  


}
