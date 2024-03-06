import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/servicios/local-storage/localStorage.service';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { muebles } from 'src/app/interfaces/muebles';

@Component({
  selector: 'app-plano-tienda',
  templateUrl: './plano-tienda.component.html',
  styleUrls: ['./plano-tienda.component.css'],
})
export class PlanoTiendaComponent implements OnInit {

  mostrar_dialogo_asignar_muebles = false;

  canvas: fabric.Canvas;
  posiciones_muebles: any[] = []; // Arreglo para almacenar los resúmenes de los muebles
  muebles: muebles[] = [];

  contadorMuebles = 0; // Contador para generar IDs únicos para los muebles
  id: number = 0;
  id_tienda: number = 0;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private mueblesService: MueblesService
  ) {}

  ngOnInit() {
    this.id_tienda = this.localStorageService.getItem('id_tienda');
    console.log('Id de la tienda:', this.id_tienda);

    this.inicializarCanvas();
    this.configurarCanvasParaAceptarArrastre();

    this.getMueblesTienda(this.id_tienda);
  }

  inicializarCanvas() {
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

  configurarCanvasParaAceptarArrastre() {
    this.canvas.on('drop', (options) => {
      const e = options.e as DragEvent;
      const mueblesData = JSON.parse(e.dataTransfer.getData('text'));
      const pointer = this.canvas.getPointer(e);

      //Añadimos un objeto en la posicion pointer.x y pointer.y
      fabric.Image.fromURL('/assets/images/icono_caja.svg', (img) => {
        img.set({
          left: pointer.x,
          top: pointer.y,
          scaleX: 0.05,
          scaleY: 0.05,
        });
        this.canvas.add(img).renderAll();
        console.log('Mueble soltado en el canvas: ', mueblesData);
      });

      //Prevenir el comportamiento por defecto del navegador
      e.preventDefault();
      e.stopPropagation();
    });

    // Permitir que el canvas acepte elementos arrastrados
    const canvasElement = this.canvas.getElement();
    canvasElement.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
  }

  getMueblesTienda(id_tienda) {
    this.mueblesService.getMueblesTiendaByIdTienda(this.id_tienda).subscribe(
      (muebles) => {
        this.muebles = muebles;
        console.log('Muebles:', this.muebles);
      },
      (error) => {
        console.error('Error al obtener los muebles:', error);
      }
    );
  }

  onDragStart(event: DragEvent, mueble: muebles) {
    event.dataTransfer.setData('text', JSON.stringify(mueble));
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
    this.posiciones_muebles.push({
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
      const index = this.posiciones_muebles.findIndex(m => m.id === this.id); // Encuentra el mueble por ID
      if (index !== -1) {
        // Actualiza los datos del mueble en el arreglo
        this.posiciones_muebles[index].left = rect.left;
        this.posiciones_muebles[index].top = rect.top;
        this.posiciones_muebles[index].width = rect.getScaledWidth();
        this.posiciones_muebles[index].height = rect.getScaledHeight();
        this.posiciones_muebles[index].angle = rect.angle;
      }
    });
  }
}
