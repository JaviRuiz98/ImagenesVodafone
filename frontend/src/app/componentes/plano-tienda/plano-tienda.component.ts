import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-plano-tienda',
  templateUrl: './plano-tienda.component.html',
  styleUrls: ['./plano-tienda.component.css'],
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule
  ],
})
export class PlanoTiendaComponent implements OnInit {
  canvas: fabric.Canvas;
  muebles: any[] = []; // Arreglo para almacenar los resúmenes de los muebles
  contadorMuebles = 0; // Contador para generar IDs únicos para los muebles
  id: number = 0;

  constructor(
    private router: Router  
  ) {}

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas_plano', {
      width: 800,
      height: 600,
      backgroundColor: 'lightgrey',
    });
    fabric.Image.fromURL('/assets/images/plano_tienda.jpg', (img) => {
      img.scaleToWidth(this.canvas.getWidth());
      img.scaleToHeight(this.canvas.getHeight());
      this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas), {
        scaleX: this.canvas.width / img.width,
        scaleY: this.canvas.height / img.height,
      });
    });
  }

  anadirRectangulo() {
    this.id++;

    const rect = new fabric.Rect({
      left: 100, // Posición inicial en el eje X
      top: 100, // Posición inicial en el eje Y
      fill: 'red', // Color de relleno
      width: 60, // Ancho inicial
      height: 70, // Alto inicial
      angle: 0, // Ángulo inicial (sin rotación)
      cornerStyle: 'circle', // Estilo de los controles de esquina para redimensionar/rotar
      borderColor: 'red', // Color del borde cuando el objeto está seleccionado
      cornerColor: 'red', // Color de las esquinas cuando el objeto está seleccionado
      cornerSize: 12, // Tamaño de las esquinas para facilitar la manipulación
      transparentCorners: false, // Esquinas no transparentes para mejor visibilidad
      hasRotatingPoint: true, // Permite la rotación con el control situado fuera del rectángulo
      opacity: 0.5, // Establece la opacidad del rectángulo para hacerlo casi transparente
    });
  
    // Añade el rectángulo al canvas
    this.canvas.add(rect);
    // Hace que el rectángulo añadido sea el objeto activo para su edición inmediata
    this.canvas.setActiveObject(rect);

    // Añadir objeto mueble al arreglo con la información inicial
    this.muebles.push({
      id: this.id,
      descripcion: `Mueble ${this.id}`,
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      angle: rect.angle,
    });

    // Escuchar eventos de modificación en el rectángulo
    rect.on('modified', () => {
      const index = this.muebles.findIndex(m => m.id === this.id); // Encuentra el mueble por ID
      if (index !== -1) {
        // Actualiza los datos del mueble en el arreglo
        this.muebles[index].left = rect.left;
        this.muebles[index].top = rect.top;
        this.muebles[index].width = rect.getScaledWidth();
        this.muebles[index].height = rect.getScaledHeight();
        this.muebles[index].angle = rect.angle;
      }
    });
  }
  
  abrirVista3D() {
    this.router.navigate(['/plano_tienda_3D']);
  }
}
