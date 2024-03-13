import { Component, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { LocalStorageService } from 'src/app/servicios/local-storage/localStorage.service';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { muebles } from 'src/app/interfaces/muebles';
import { UrlService } from 'src/app/servicios/url/url.service';
import { MessageService } from 'primeng/api';
import { posiciones_muebles_tienda } from 'src/app/interfaces/posiciones_muebles_tienda';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-plano-tienda',
  templateUrl: './plano-tienda.component.html',
  styleUrls: ['./plano-tienda.component.css'],
})
export class PlanoTiendaComponent implements OnInit {

  @ViewChild('op') op: OverlayPanel;

  mostrar_dialog_asignar_muebles = false;

  canvas: fabric.Canvas;
  posiciones_muebles: any[] = []; // Arreglo para almacenar los resúmenes de los muebles
  muebles: muebles[] = [];

  contadorMuebles = 0; // Contador para generar IDs únicos para los muebles
  id: number = 0;
  id_tienda: number = 0;
  anchura_barra: number = 0;

  constructor(
    private localStorageService: LocalStorageService,
    private mueblesService: MueblesService,
    public urlService: UrlService,
    private messageService: MessageService,
    private tiendasService: TiendasService
  ) {}

  ngOnInit() {
    this.id_tienda = this.localStorageService.getItem('id_tienda');
    console.log('Id de la tienda:', this.id_tienda);

    this.obtenerAnchuraBarra();

    this.inicializarCanvas();
    this.accionAlAsignarMueble();

    this.getMueblesTienda(this.id_tienda);
  }

  obtenerAnchuraBarra() {
    this.anchura_barra = this.localStorageService.getItem('anchura_componente_barra');
    console.log('Anchura de la barra:', this.anchura_barra);
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

  async accionAlAsignarMueble() {
    this.canvas.on('drop', (options) => {
      const e = options.e as DragEvent;
      const mueblesData = JSON.parse(e.dataTransfer.getData('text'));
      const pointer = this.canvas.getPointer(e);

      let isOverRect = false;
      let targetRect;

      // Iterar por todos los objetos en el canvas para encontrar si el punto de soltar está sobre algun rectangulo
      this.canvas.getObjects().forEach((object) => {
        if (object.type === 'rect' && object.containsPoint(pointer)) {
          isOverRect = true;
          targetRect = object; // Guardar el rectangulo que contiene el punto de soltar
        }
      });

      if(!isOverRect || !targetRect){
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Localización de mueble no válida' });
      } else { // estamos sobre un rectangulo
        const datos_posicion_mueble: posiciones_muebles_tienda = {
          id_pertenencia_mueble_tienda: mueblesData.pertenencia_mueble_tienda[0].id,
          x_start: targetRect.left,
          y_start: targetRect.top,
          ancho: targetRect.width,
          alto: targetRect.height,
          angulo: targetRect.angle
        }
        console.log('datos_posicion_mueble: ', datos_posicion_mueble);
        console.log('targetRect: ', targetRect);
        this.guardarDatosPosicionEnBaseDatos(datos_posicion_mueble);
        this.canvas.renderAll();
      }
    });
  }

  guardarDatosPosicionEnBaseDatos(datos_posicion_mueble: posiciones_muebles_tienda) {
    this.tiendasService.guardarPosicionMueble(datos_posicion_mueble).subscribe(
      (data) => {
        console.log('Posición del mueble guardada en la base de datos:', data);

        this.getMueblesTienda(this.id_tienda);
      }, (error) => {
        console.error('Error al guardar la posición del mueble en la base de datos:', error);
      }
    )
  }

  async anadirIconoDentroRectangulo(targetRect: any, id_posicion_mueble: number, mueble: muebles) {
    fabric.Image.fromURL(this.urlService.url_imagenes_referencia + mueble.imagen_representativa[0].url, (img) => {
      const scaleX = targetRect.width / img.width;
      const scaleY = targetRect.height / img.height;
      const scale = Math.min(scaleX, scaleY);

      img.set({
        left: targetRect.left + targetRect.width / 2 - (img.width * scale) / 2,
        top: targetRect.top + targetRect.height / 2 - (img.height * scale) / 2,
        originX: 'center',
        originY: 'center',
        scaleX: scale,
        scaleY: scale,
      });

      // Aplicar la misma rotación del rectángulo al icono
      img.rotate(targetRect.angle);

      // Ajustar las coordenadas del icono considerando la rotación
      // Esto es necesario si la rotación no es respecto al centro del canvas
      const cosAngle = Math.cos(fabric.util.degreesToRadians(targetRect.angle));
      const sinAngle = Math.sin(fabric.util.degreesToRadians(targetRect.angle));

      const dx = (targetRect.width / 2) * cosAngle - (targetRect.height / 2) * sinAngle;
      const dy = (targetRect.width / 2) * sinAngle + (targetRect.height / 2) * cosAngle;

      img.set({
        left: targetRect.left + dx,
        top: targetRect.top + dy,
      });

      const group = new fabric.Group([targetRect,img], { });

      // Bloqueo el movimiento del rectángulo una vez se le asigna un mueble
      group.set({
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true,
        hasControls: false, // Opcional: deshabilita los controles de escalado y rotación
        evented: false,
        id_posicion_mueble: id_posicion_mueble
      });

      this.canvas.add(group);

      if(targetRect) {
        this.canvas.remove(targetRect); // Eliminar el rectángulo para que no se duplique
        console.log('Rectangulo eliminado: ', targetRect);
      }

      console.log('group: ', group);
    });
  }

  getMueblesTienda(id_tienda) {
    this.mueblesService.getMueblesTiendaByIdTienda(this.id_tienda).subscribe(
      (muebles) => {
        this.muebles = muebles;
        console.log('Muebles:', this.muebles);

        this.cargarMueblesAsignados();
      },
      (error) => {
        console.error('Error al obtener los muebles:', error);
      }
    );
  }

  async cargarMueblesAsignados() {
    await this.vaciarMueblesDelCanvas();

    this.muebles.forEach(mueble => {
      mueble.pertenencia_mueble_tienda.forEach(pertenencia => {
          pertenencia.posiciones_muebles_tienda.forEach(posicion => {
              this.inicializarRectanguloConMueble(posicion, posicion.id, mueble);
          });
      });
    });
  }

  vaciarMueblesDelCanvas() {
    this.canvas.getObjects().forEach(object => {
        this.canvas.remove(object);
      }
    )
  }

  inicializarRectanguloConMueble(posicion, id_posicion_mueble, mueble) {
    const rect = new fabric.Rect({
        left: posicion.x_start,
        top: posicion.y_start,
        fill: 'red', // Asumiendo que quieres un color específico para los rectángulos con muebles
        width: posicion.ancho,
        height: posicion.alto,
        angle: posicion.angulo,
        cornerStyle: 'circle',
        borderColor: 'red',
        cornerColor: 'red',
        cornerSize: 12,
        transparentCorners: false,
        hasRotatingPoint: true,
        opacity: 0.1, // Establece la opacidad del rectángulo para indicar que está ocupado
    });

    // Añade el rectángulo al canvas
    this.canvas.add(rect);

    // Opcional: Añadir icono o texto para representar el mueble dentro del rectángulo
    this.anadirIconoDentroRectangulo(rect, id_posicion_mueble, mueble);

    this.canvas.renderAll();
  }

  onDragStart(event: DragEvent, mueble: muebles) {
    event.dataTransfer.setData('text', JSON.stringify(mueble));
  }

  anadirRectangulo() {
    this.id++;

    const rect = new fabric.Rect({
      left: 100, // Posición inicial en el eje X
      top: 100, // Posición inicial en el eje Y
      fill: 'yellow', // Color de relleno
      width: 60, // Ancho inicial
      height: 70, // Alto inicial
      angle: 0, // Ángulo inicial (sin rotación)
      cornerStyle: 'circle', // Estilo de los controles de esquina para redimensionar/rotar
      borderColor: 'red', // Color del borde cuando el objeto está seleccionado
      cornerColor: 'red', // Color de las esquinas cuando el objeto está seleccionado
      cornerSize: 12, // Tamaño de las esquinas para facilitar la manipulación
      transparentCorners: false, // Esquinas no transparentes para mejor visibilidad
      hasRotatingPoint: true, // Permite la rotación con el control situado fuera del rectángulo
      opacity: 0.2, // Establece la opacidad del rectángulo para hacerlo casi transparente
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
      rect.set({
        width: rect.getScaledWidth(),
        height: rect.getScaledHeight(),
        scaleX: 1,
        scaleY: 1,
      })
    });
  }

  eliminarPosicionMueble(id_posicion_mueble: number) {
    const objetoAEliminar = this.detectarRectanguloDadoIdMueble(id_posicion_mueble);

    if(objetoAEliminar) {
      console.log('Objeto detectado', objetoAEliminar);

      this.tiendasService.eliminarPosicionMueble(id_posicion_mueble).subscribe(
        res => {
          console.log('res', res);

          this.canvas.remove(objetoAEliminar);
          this.canvas.renderAll();
          this.getMueblesTienda(this.id_tienda);

        }, error => console.log(error)
      );

      
    } else {
      console.log('No se encontro el objeto');
    }
  }

  detectarRectanguloDadoIdMueble(id_posicion_mueble: number): fabric.group | null {
    let objetoDetectado = null;

    this.canvas.getObjects().forEach(objeto => {
      console.log(objeto.id_posicion_mueble, id_posicion_mueble)
      if (objeto.id_posicion_mueble && objeto.id_posicion_mueble === id_posicion_mueble) {
        objetoDetectado = objeto;
      }
    }) 
    return objetoDetectado;
  }

  getPosicionMuebleDadoMueble(mueble: muebles): posiciones_muebles_tienda {
    const posicion = mueble.pertenencia_mueble_tienda[0].posiciones_muebles_tienda[0]
    return posicion;
  }

  cambiarMuebles() {
    this.mostrar_dialog_asignar_muebles = true;
  }
}
