import { Component, OnInit, Input, Output, EventEmitter,ElementRef, ViewChild  } from '@angular/core';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: 'app-remarcar-expositor',
  templateUrl: './remarcar-expositor.component.html',
  styleUrls: ['./remarcar-expositor.component.css'],
  providers: [],
  standalone: true,
  imports: [
    DialogModule
  ]
})





export class RemarcarExpositorComponent implements OnInit {
  @Input () imagen: string;
  @Output () imagenCambiada = new EventEmitter<any>();

  // @ViewChild('canvas', { static: false }) private canvasEl!: ElementRef<HTMLCanvasElement>;




  title = 'rectangleDrawingExample';
  canvasRef: any;
  ctx: any;
  startX: number | null = null;
  startY: number | null = null;
  endX: number | null = null;
  endY: number | null = null;

  private stateHistory: any[] = [];

  constructor() { }

  ngAfterViewInit(): void {
 
    const canvasElement = document.getElementById('canvas');
    this.ctx = (canvasElement as HTMLCanvasElement).getContext('2d');
    const imageElement = document.getElementById('target-image') as HTMLImageElement;
    this.loadImage(imageElement);
  }
 
  
  loadImage(imageElement: HTMLImageElement): void {
    //imageElement.src = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/' + '11.jpg';
    imageElement.src = '../../../assets/images/Captura.PNG';
    imageElement.onload = () => {
      const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
      canvasElement.width = imageElement.naturalWidth;
      canvasElement.height = imageElement.naturalHeight;
      this.ctx.drawImage(imageElement, 0, 0);
    };
  }

  onMouseDown(event: MouseEvent): void {
  this.startX = event.offsetX;
  this.startY = event.offsetY;

  // Agregar un listener para el evento mousemove
  document.addEventListener('mousemove', this.onMouseMove);
}

onMouseMove = (event: MouseEvent) => {
  if (this.startX !== null && this.startY !== null) { 
    // Primero, redibujar todo
    this.redrawCanvas();

    // Luego, obtén las coordenadas actuales del ratón
    const currentX = event.offsetX;
    const currentY = event.offsetY;

    // Y por último, dibujar el nuevo rectángulo parcial
    this.ctx.strokeStyle = 'rgba(255, 255, 0, 0.4)';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.rect(this.startX, this.startY, currentX - this.startX, currentY - this.startY);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

onMouseUp(event: MouseEvent): void {
  // Eliminar el listener del evento mousemove
  document.removeEventListener('mousemove', this.onMouseMove);

  // Establecer las coordenadas finales y dibujar el rectángulo final
  this.endX = event.offsetX;
  this.endY = event.offsetY;
  this.drawRectangle();
  this.saveState();
  // Limpiar las coordenadas al finalizar el dibujo
  this.resetCoordinates();
}


  drawRectangle(): void {

    if (!this.startX || !this.startY || !this.endX || !this.endY) {
      console.error('Incomplete rectangle coordinates.');
      return;
    }


    this.ctx.strokeStyle = 'rgba(255, 255, 0, 0.4)'; // Cambiar el color al amarillo semi-transparente
    this.ctx.fillStyle = 'rgba(255, 255, 0, 0.4)'; // Configura fillStyle para relleno semi-trasnparente
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.rect(Math.min(this.startX!, this.endX!), Math.min(this.startY!, this.endY!), Math.abs(this.startX! - this.endX!), Math.abs(this.startY! - this.endY!));
    this.ctx.fill(); // Agregamos relleno
    this.ctx.closePath();
    this.ctx.stroke();
    console.log(`Punto de inicio: (${this.startX}, ${this.startY}), punto final: (${this.endX}, ${this.endY})`);
  }


  clearRectangles(): void {
    this.stateHistory = [];
    const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    const imageElement = document.getElementById('target-image') as HTMLImageElement;
    this.ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    this.ctx.drawImage(imageElement, 0, 0);
    this.resetCoordinates();
  }
  
  resetCoordinates(): void {
    this.startX = null;
    this.startY = null;
    this.endX = null;
    this.endY = null;
  }


  saveState(): void {
    this.stateHistory.push(this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height));

  }
  
  undoLastAction(): void {
    if (this.stateHistory.length >= 0) {
      const lastState = this.stateHistory.pop();
      this.ctx.putImageData(lastState, 0, 0);
    } else {
      console.warn('No more actions to undo');
    }
    this.redrawCanvas();
  }

  redrawCanvas(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    const imageElement = document.getElementById('target-image') as HTMLImageElement;
    this.ctx.drawImage(imageElement, 0, 0);
    for (const state of this.stateHistory) {
      this.ctx.putImageData(state, 0, 0);
    }
  }


  ngOnInit(): void {
 
  }

}
