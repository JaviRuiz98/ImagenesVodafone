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
  canvasRef: any;
  ctx: any;
  

  ngOnInit() {
    if (this.dialogConfig.data) {
      this.expositor = this.dialogConfig.data.expositor;

      const canvasElement = document.getElementById('canvas');
      this.ctx = (canvasElement as HTMLCanvasElement).getContext('2d');

      const imageElement = this.getImagenModelo();
      this.loadImage(imageElement);

      
      // Permitir drop en el canvas
      canvasElement.addEventListener('dragover', (event) => {
        event.preventDefault(); 
        // para que cambie el rectángulo al pasar el ratón con un elemento
        this.effectSelectable(canvasElement as HTMLCanvasElement, event); 
      });

    canvasElement.addEventListener('drop', (event) => {
      this.handleCanvasDrop(event);
    });
    }
  }


  loadImage(imageElementSrc: string): void {
    this.imageElement = new Image(); 
    this.imageElement.onload = () => {
      const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
      canvasElement.width =  this.imageElement.naturalWidth;
      canvasElement.height =  this.imageElement.naturalHeight;
        this.ctx.drawImage( this.imageElement, 0, 0); 
        for (const state of this.expositor.atributos_expositores) {
            console.log(state);
            this.ctx.strokeStyle = 'rgba(0, 0, 0)';
            this.ctx.st
            this.ctx.lineWidth = 3;
            this.ctx.setLineDash([5, 5]); // Define el patrón de trazo discontinuo

            
            const xMin = state.x_min;
            const yMin = state.y_min; 
            const width = state.x_max - state.x_min; 
            const height = state.y_max - state.y_min;


            this.ctx.beginPath();
            this.ctx.rect(xMin, yMin, width, height);
            this.ctx.fillStyle = 'rgba(255, 255, 255,  0.5)';
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();

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
    };
    this.imageElement.src = imageElementSrc; 
}

handleCanvasDrop(event: DragEvent) {
  event.preventDefault();
  const rect = (event.target as HTMLCanvasElement).getBoundingClientRect();
  const x = event.clientX - rect.left; // X dentro del canvas
  const y = event.clientY - rect.top;  // Y dentro del canvas

  // Recupera la información del elemento arrastrado
  const elementoData = event.dataTransfer.getData("text");
  const elemento: elementos = JSON.parse(elementoData);

  // Verificar si (x, y) está dentro de alguno de los rectángulos
  const droppedOnIndex = this.expositor.atributos_expositores.findIndex(state => {
    return x >= state.x_min && x <= state.x_max && y >= state.y_min && y <= state.y_max;
  });

  if (droppedOnIndex !== -1 && elemento) {
    console.log("Elemento soltado sobre el atributo con índice:", droppedOnIndex);
    // Asigna el elemento al atributo_expositor donde se soltó
    this.expositor.atributos_expositores[droppedOnIndex].elemento = elemento;
    console.log(this.expositor);
    this.updateExpositor();
    const droppedOn = this.expositor.atributos_expositores[droppedOnIndex];
    const imageElement = new Image();
    imageElement.onload = () => {
      const width = droppedOn.x_max - droppedOn.x_min;
      const height = droppedOn.y_max - droppedOn.y_min;
      this.ctx.drawImage(imageElement, droppedOn.x_min, droppedOn.y_min, width, height);
    };
    imageElement.src = this.url_imagenes_referencias + elemento.imagenes.url;
  }

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

  
  effectSelectable( canvasElement: HTMLCanvasElement, event: DragEvent) {
      
    const rect = canvasElement.getBoundingClientRect();
    const x = event.clientX - rect.left; // X dentro del canvas
    const y = event.clientY - rect.top;  // Y dentro del canvas

    // Limpia el canvas y redibuja la imagen base y todos los rectángulos
    this.ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    this.ctx.drawImage( this.imageElement, 0, 0, canvasElement.width, canvasElement.height);

    this.expositor.atributos_expositores.forEach(state => {
      if (x >= state.x_min && x <= state.x_max && y >= state.y_min && y <= state.y_max) {
        // Cambia el color si el cursor está sobre el rectángulo
        this.ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'; // Color de relleno al arrastrar sobre
        this.ctx.strokeStyle = 'rgba(0, 255, 0)'; // Color del borde al arrastrar sobre
      } else {
        // Colores predeterminados
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.strokeStyle = 'rgba(0, 0, 0)';
      }

      // Redibuja el rectángulo
      this.ctx.beginPath();
      this.ctx.rect(state.x_min, state.y_min, state.x_max - state.x_min, state.y_max - state.y_min);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    });

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
