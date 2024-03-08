import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { fabric } from 'fabric';

import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { elementos } from 'src/app/interfaces/elementos';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { UrlService } from 'src/app/servicios/url/url.service';
import { MessageService } from 'primeng/api';
import { group } from '@angular/animations';


@Component({
  selector: 'app-PasoAsignarElementoForm',
  templateUrl: './PasoAsignarElementoForm.component.html',
  styleUrls: ['./PasoAsignarElementoForm.component.css']
})
export class PasoAsignarElementoFormComponent implements AfterViewInit {


  constructor( private fb: FormBuilder, private urlService: UrlService, public dialogConfig : DynamicDialogConfig, private cdr: ChangeDetectorRef, public messageService : MessageService) { }

  canvas: fabric.Canvas;
  
  dragged_elemento: elementos|undefined;
  private groupRefs: fabric.Group[] = []; // Almacenar referencias a los grupos
  rectangulos_creados: boolean = false;

  @Input () expositorFormulario: FormGroup; 
  @Output () formularioPasoAsignarAtributoSinHuecos = new EventEmitter<{index:number, atributo: atributos_expositores} >();

  

  get nombre_expositor() {
    return this.expositorFormulario? this.expositorFormulario.get('nombre_expositor'): undefined;
  }


  get atributos_expositores() {
    return this.expositorFormulario?this.expositorFormulario.get('atributos_expositores') as FormArray : undefined;
  }

  get imagenesModeloExpositores(): string | undefined {
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
  get elementosNoModelosExpositores(): FormArray | undefined {
    const otrosElementosArray: FormGroup[] = [];
    
    this.atributos_expositores? this.atributos_expositores.controls.forEach((atributoExpositor) => {
      const elemento = atributoExpositor.get('elemento') as FormGroup;
      const categoria = elemento.get('categorias_elementos')?.value;
      
      if (categoria.id !== 3 && categoria.id !== 0) {
        otrosElementosArray.push(elemento);
      }
    }): undefined;
  
    if (otrosElementosArray.length > 0) {
      const formArray = new FormArray(otrosElementosArray);
      return formArray;
    } else {
      return undefined;
    }
  }

  get firstElementoSinModeloExpositor(): elementos | undefined {
  
    if (!!this.atributos_expositores) {
      for (let i = 0; i < this.atributos_expositores.controls.length; i++) {
        const atributoExpositor = this.atributos_expositores.controls[i];
        const elemento = atributoExpositor.get('elemento') as FormGroup;
        const categoria = elemento.get('categorias_elementos')?.value;
        
        if (categoria !== undefined && categoria !== null &&categoria.id !== 3 && categoria.id !== 0 ) {
          return elemento.value ;
        }
      }
      
    }
    return undefined;
  }
  get indexAtributoFirstElementoSinModeloExpositor(): number | undefined {
    if (!!this.atributos_expositores) {
      for (let i = 0; i < this.atributos_expositores.controls.length; i++) {
        const atributoExpositor = this.atributos_expositores.controls[i];
        const elemento = atributoExpositor.get('elemento') as FormGroup;
        const categoria: number = elemento.get('categorias_elementos')?.value;
        if (categoria !== 3) {
          return i;
        }
      }
    }
    return -1;
  }

  get huecos(): FormArray | undefined {
    const huecosArray: FormGroup[] = [];
  
    if (this.atributos_expositores) {
      this.atributos_expositores.controls.forEach((atributoExpositor) => {
        const atributo = atributoExpositor.value;
        if (atributo.alto != null && atributo.ancho != null && atributo.x_start != null && atributo.y_start != null) {
          huecosArray.push(atributoExpositor as FormGroup);
        }
      });
    } else {
      return undefined; // Devolver undefined si atributos_expositores es undefined
    }
  
    return huecosArray.length > 0 ? new FormArray(huecosArray) : undefined;
  }
  
  onSeleccionadoSinHuecos($event: elementos){
    
    const atributo: atributos_expositores = {
      categorias_elementos: $event.categorias_elementos, // por defecto será la del elemento
      elemento: $event,
    };
    if (this.indexAtributoFirstElementoSinModeloExpositor != -1){
      this.formularioPasoAsignarAtributoSinHuecos.emit( {index:this.indexAtributoFirstElementoSinModeloExpositor,  atributo:atributo}); 
    }

  }

   onDragEnd(event:{dragEvent:  CdkDragDrop<string[]>}) {
     console.log("terminar");
   }

   onDragStart(event: {dragEvent: DragEvent, elemento: elementos}) {
    event.dragEvent.dataTransfer.setData("text", JSON.stringify(event.elemento));
    this.dragged_elemento = event.elemento;
 
   }
 
  initCanvas(){
    const canvasEl = document.getElementById('funciona_please');
    if (canvasEl) {
    

      this.canvas = new fabric.Canvas('funciona_please', {
       
        backgroundColor: 'lightgrey',
      });
      
      fabric.Image.fromURL(this.imagenesModeloExpositores, (img) => {
        img.scaleToWidth(this.canvas.getWidth());
        img.scaleToHeight(this.canvas.getHeight());
        this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas), {
          scaleX: this.canvas.width / img.width,
          scaleY: this.canvas.height / img.height,
        });
      }, {
        onError: (err) => console.error('Error cargando la imagen:', err)
      });
    }else {
      console.error('No se encontro el elemento canvas');
    }
    
  }

  createGroup(atributo: FormGroup, fillColor: string = 'white', strokeColor: string = 'black', lineStrokeColor: string = 'black'): fabric.Group {
    const x = atributo.get('x_start')?.value || 0;
    const y = atributo.get('y_start')?.value || 0;
    const w = atributo.get('ancho')?.value || 0;
    const h = atributo.get('alto')?.value || 0;
    const angulo = atributo.get('angulo')?.value || 0;
  
    const rect = new fabric.Rect({
      left: x,
      top: y,
      fill: fillColor,
      opacity: 0.5,
      width: w,
      height: h,
      stroke: strokeColor,
      strokeWidth: 2,
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false,
    });
  
    // Ajustar la longitud de las líneas para hacerlas más pequeñas
    const lineLength = Math.min(w, h) * 0.2; // Longitud de las líneas, ajustada al 20% del ancho o la altura del rectángulo
  
    // Crear una línea horizontal
    const lineHorizontal = new fabric.Line([x + (w / 2) - (lineLength / 2), y + (h / 2), x + (w / 2) + (lineLength / 2), y + (h / 2)], {
      stroke: lineStrokeColor,
    });
  
    // Crear una línea vertical
    const lineVertical = new fabric.Line([x + (w / 2), y + (h / 2) - (lineLength / 2), x + (w / 2), y + (h / 2) + (lineLength / 2)], {
      stroke: lineStrokeColor,
    });
  
    const group = new fabric.Group([rect, lineHorizontal, lineVertical], {
      left: x,
      top: y,
      angle: angulo,
      selectable: false,
      evented: false,
    });
  
    return group;
  }
 
  drawRectangles(): void {
    const huecos = this.huecos;
    if (huecos) {
      huecos.controls.forEach((atributoExpositor, index) => {
        if (!this.groupRefs[index]) { // Si no existe un grupo para este índice, créalo
          const grupo = this.createGroup(atributoExpositor as FormGroup);
          this.groupRefs[index] = grupo; // Almacenar referencia al grupo
          this.canvas.add(grupo);

          //busco imagen
          const elemento = atributoExpositor.get('elemento')?.value;
          if (elemento){
            const imagen: string = elemento?.imagenes.url;  
            //si tiene imagen, la dibujo
            this.addImageOnGroup(index, imagen);
          }
        } else { // Si el grupo ya existe, actualiza sus propiedades
          this.updateGroupProperties(index, 'white', 'black', 'black');
        }
      });
      this.canvas.renderAll();
    }
  }

  eliminarImagen( index_hueco:number) {
    this.huecos.at(index_hueco).patchValue({
      elemento: undefined
    });
    this.deleteImageFromCanvas(this.groupRefs[index_hueco]);
    this.canvas.renderAll();

    
  } 
  deleteImageFromCanvas(grupo: fabric.Group) {
    const objetosParaEliminar = [];
    grupo.getObjects().forEach((obj) => {
      if (obj.type === 'image') {
        objetosParaEliminar.push(obj);
      }
    });

    objetosParaEliminar.forEach((obj) => {
      grupo.remove(obj);
    });

  }

  getRotatedCoordinateX(index_hueco: number): number {
    
    const grupo = this.groupRefs[index_hueco];

    const cosAngle = Math.cos(fabric.util.degreesToRadians(grupo.angle));
    const sinAngle = Math.sin(fabric.util.degreesToRadians(grupo.angle));
 
    const dx = (grupo.width / 2) * cosAngle - (grupo.height / 2) * sinAngle;

    return grupo.left + dx;
  }


  
  getRotatedCoordinateY( index_hueco: number): number {
  
    const grupo = this.groupRefs[index_hueco];
    
    const cosAngle = Math.cos(fabric.util.degreesToRadians(grupo.angle));
    const sinAngle = Math.sin(fabric.util.degreesToRadians(grupo.angle));
 
    const dy = (grupo.width / 2) * sinAngle + (grupo.height / 2) * cosAngle;

  
    return grupo.top + dy;

  }
  
  addImageOnGroup(index_hueco	: number, imagen: string) {

    const imagenUrl = this.urlService.url_imagenes_referencia + imagen;
    const grupo = this.groupRefs[index_hueco];

    fabric.Image.fromURL(imagenUrl, (img) => {

      const scaleRatio = Math.min(
        grupo.getScaledWidth() / img.width,
        grupo.getScaledHeight() / img.height
      );
  
      // Calcular la posición central del rectángulo dentro del grupo
      const centroRectX = grupo.left + grupo.width / 2;
      const centroRectY = grupo.top + grupo.height / 2;
  
      // Configurar la imagen para que su centro coincida con el centro del rectángulo
      img.scale(scaleRatio).set({
        left: centroRectX - img.getScaledWidth() / 2,
        top: centroRectY - img.getScaledHeight() / 2,
        originX: 'center',
        originY: 'center',
      });

      //Rotación
      img.rotate(grupo.angle);
 
      const cosAngle = Math.cos(fabric.util.degreesToRadians(grupo.angle));
      const sinAngle = Math.sin(fabric.util.degreesToRadians(grupo.angle));
 
      const dx = (grupo.width / 2) * cosAngle - (grupo.height / 2) * sinAngle;
      const dy = (grupo.width / 2) * sinAngle + (grupo.height / 2) * cosAngle;
  
      img.set({
        left: grupo.left + dx,
        top: grupo.top + dy,
      });

      // Añadir la imagen al grupo y actualizar
      grupo.addWithUpdate(img);
      this.canvas.renderAll();
    });
  }
  
    
  updateGroupProperties(groupIndex: number,  fillColor: string, strokeColor: string, lineStrokeColor: string): void {
    const group = this.groupRefs[groupIndex];
    if (group) {
      const rect = group.getObjects()[0] as fabric.Rect;
      const lineHorizontal = group.getObjects()[1] as fabric.Line;
      const lineVertical = group.getObjects()[2] as fabric.Line;
  
      rect.set({
        fill: fillColor,
        stroke: strokeColor,
      });
  
      lineHorizontal.set({ stroke: lineStrokeColor });
      lineVertical.set({ stroke: lineStrokeColor });
  
      group.setCoords(); 
      this.canvas.renderAll();
    
    }
  }
 
  configurarEventosCanvas(){
    if (!this.canvas) return;

    const canvasEl = this.canvas.upperCanvasEl;

    // Permitir que los elementos sean arrastrados sobre el canvas
    canvasEl.addEventListener('dragover', (event) => {
      this.effectSelectable( event); 
    });
    

    // Manejar el evento drop en el canvas
    canvasEl.addEventListener('drop', (event) => {
      this.handleCanvasDrop(event);
    });
  }

  effectSelectable(event: DragEvent) {
    event.preventDefault();
    if (!this.canvas) return;
    const pointer = this.canvas.getPointer(event);
    this.huecos?.controls.forEach((atributoExpositor, index) => {
      const group = this.groupRefs[this.huecos.controls.indexOf(atributoExpositor)];
      if (this.puntoDentroDelHueco(pointer, group)) {
        
        this.updateGroupProperties(index, 'gray', 'red', 'red');
      } else {
        this.updateGroupProperties(index, 'white', 'black', 'black');
      }
    });
  }
  

  handleCanvasDrop(event: DragEvent) {
    event.preventDefault();
    if (!this.canvas) return;

    const pointer = this.canvas.getPointer(event);
    if (!this.dragged_elemento) return;

    const indiceSoltado = this.huecos.controls.findIndex((atributoExpositor) => {
       const group = this.groupRefs[this.huecos.controls.indexOf(atributoExpositor)];
        return this.puntoDentroDelHueco( pointer, group);
    });

    if (indiceSoltado !== -1) {
      const image_url:string = this.dragged_elemento.imagenes.url;
      const atributo = this.huecos.controls.at(indiceSoltado);
      atributo.patchValue({
        elemento: {
          id: this.dragged_elemento.id,
          imagenes: {
            url: image_url
          }
        }
      });

    const categoria_hueco = this.huecos.controls.at(indiceSoltado).get('categorias_elementos').value;
    if (categoria_hueco && this.dragged_elemento.categorias_elementos.id !== categoria_hueco.id) {
      this.messageService.add({ key: 'edit', severity: 'warn', summary: 'Error', detail: 'La categoría permitida para esta posición es "' + categoria_hueco.nombre.toLowerCase()  + '"'});
      this.updateGroupProperties(indiceSoltado, 'white', 'black', 'black');
      return;
    }

      const group: fabric.Group = this.groupRefs[indiceSoltado];
      this.updateGroupProperties(indiceSoltado, 'white', 'black', 'black');
      this.addImageOnGroup(indiceSoltado, image_url);
    
    }else {
      console.log("se ha soltado fuera del hueco"); 
    }
  }

  puntoDentroDelHueco(pointer, group: fabric.Group) {
    if (!this.canvas) return false; 
    return group.containsPoint(pointer);
  }
 


 ngAfterViewInit(): void {
  if (this.huecos && this.huecos.length > 0) {
    console.log(this.huecos.value);
    this.initCanvas();
    this.drawRectangles();
    this.configurarEventosCanvas();
  }
 
 }

  
}
