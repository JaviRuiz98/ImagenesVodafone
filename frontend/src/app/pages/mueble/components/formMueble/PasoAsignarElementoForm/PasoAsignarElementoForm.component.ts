import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { fabric } from 'fabric';

import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { elementos } from 'src/app/interfaces/elementos';
import { CdkDragDrop } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-PasoAsignarElementoForm',
  templateUrl: './PasoAsignarElementoForm.component.html',
  styleUrls: ['./PasoAsignarElementoForm.component.css']
})
export class PasoAsignarElementoFormComponent implements OnInit {

  constructor( public dialogConfig : DynamicDialogConfig, private cdr: ChangeDetectorRef) { }

  canvas: fabric.Canvas;

  @Input () expositorFormulario: FormGroup; 
  @Output () formularioPasoAsignarAtributoSinHuecos = new EventEmitter<{index:number, atributo: atributos_expositores} >();



  get nombre_expositor() {
    return this.expositorFormulario? this.expositorFormulario.get('nombre_expositor'): undefined;
  }


  get atributos_expositores() {
    return this.expositorFormulario?this.expositorFormulario.get('atributos_expositores') as FormArray : undefined;
  }

  get imagenesModeloExpositores(): string | undefined {
    
    this.atributos_expositores? this.atributos_expositores.controls.forEach((atributoExpositor) => {
        
        const elemento = atributoExpositor.get('elemento') as FormGroup;
        const categoria = elemento.get('categoria_elementos')?.value;
        const imagen = elemento.get('imagen')?.value;
        if (imagen && categoria.id === 3) {
          return imagen;
        }
      }): undefined;

    return undefined;
   
  }

  get elementosNoModelosExpositores(): FormArray | undefined {
    const otrosElementosArray: FormGroup[] = [];
    
    this.atributos_expositores? this.atributos_expositores.controls.forEach((atributoExpositor) => {
      const elemento = atributoExpositor.get('elemento') as FormGroup;
      const categoria = elemento.get('categoria_elementos')?.value;
      
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
        const categoria = elemento.get('categoria_elementos')?.value;
        
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
        const categoria: number = elemento.get('categoria_elementos')?.value;
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

 
  initCanvas(){
    this.canvas = new fabric.Canvas('canvas', {
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

  drawRecangles(){
 
    for (let i = 0; i < this.huecos.length; i++) {
      const atributo = this.huecos.at(i) as FormGroup;
      const x = atributo.get('x_start')?.value || 0;
      const y = atributo.get('y_start')?.value || 0;
      const w = atributo.get('ancho')?.value || 0;
      const h = atributo.get('alto')?.value || 0;
      const angulo = atributo.get('angulo')?.value || 0;

      const rect = new fabric.Rect({
        left: x, 
        top: y, 
        fill: 'red', 
        width: w, 
        height: h, 
        angle: angulo, 
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
    }
  }

  configurarEventosCanvas(){
    if (!this.canvas) return;

    this.canvas.addEventListener('drop', (event) => {
      event.preventDefault();
      this.handleCanvasDrop(event);
    });
  }

  handleCanvasDrop(event) {
    event.preventDefault();
    if (!this.canvas) return;

    const pointer = this.canvas.getPointer(event.e);
    const x = pointer.x;
    const y = pointer.y;

    const elementoData = event.dataTransfer?.getData("text");
    const elemento = elementoData ? JSON.parse(elementoData) : null;
    if (!elemento) return;

    const puntoSoltado = { x, y };

   
    const indiceSoltado = this.huecos.controls.findIndex((atributoExpositor) => {
        const x_start = atributoExpositor.get('x_start').value;
        const y_start = atributoExpositor.get('y_start').value;
        const ancho = atributoExpositor.get('ancho').value;
        const alto = atributoExpositor.get('alto').value;
        return this.puntoDentroDelHueco(puntoSoltado, {x_start, y_start, ancho, alto});
    });

    if (indiceSoltado !== -1) {
        
      this.huecos.controls.at(indiceSoltado).patchValue({
        elemento_id: elemento.id
      })
      
        // Carga y muestra la imagen en el hueco correspondiente
        const atributo = this.huecos.at(indiceSoltado) as FormGroup;
        const imagenURL = elemento.imagen; // Asegúrate de que 'elemento' tenga una propiedad 'imagen'
        fabric.Image.fromURL(imagenURL, (img) => {
            img.set({
                left: atributo.get('x_start').value,
                top: atributo.get('y_start').value,
                scaleX: atributo.get('ancho').value / img.width,
                scaleY: atributo.get('alto').value / img.height,
                selectable: false // Para evitar que la imagen sea seleccionable si no lo deseas
            });
            this.canvas.add(img);
        });
    }
}

puntoDentroDelHueco ({x, y}, {x_start, y_start, ancho, alto}) {
  return x >= x_start && x <= x_start + ancho && y >= y_start && y <= y_start + alto;
}


  
 
  ngOnInit() {
    this.initCanvas();
    this.drawRecangles();
    this.configurarEventosCanvas();

  }

  
}
