import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProcesamientoService } from 'src/app/servicios/procesamiento-imagenes/procesamiento-services.service';
import { UrlService } from 'src/app/servicios/url/url.service';
import { fabric } from 'fabric';
import { elementos } from 'src/app/interfaces/elementos';
import { expositores } from 'src/app/interfaces/expositores';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-viewExpositor',
  templateUrl: './viewExpositor.component.html',
  styleUrls: ['./viewExpositor.component.css']
})
export class ViewExpositorComponent implements AfterViewInit {

 

  constructor(private imagenService: ProcesamientoService, public dialogConfig : DynamicDialogConfig, private urlService: UrlService,) { }


  canvas: fabric.Canvas;
  
  dragged_elemento: elementos|undefined;
  private groupRefs: fabric.Group[] = []; // Almacenar referencias a los grupos
  rectangulos_creados: boolean = false;
  categoria_id_modelo: number = 3;

  expositor: expositores|undefined;


  


 
 
  get imagenesModeloExpositores(): string | undefined {
    if (this.expositor.atributos_expositores) {
      for (let atributoExpositor of this.expositor.atributos_expositores) {
       
        const elemento = atributoExpositor.elemento;
        if (!elemento) {
          continue;
        }
        const categoria = elemento.categorias_elementos;
        const imagen = elemento.imagenes.url;
        if (imagen && categoria && categoria.id === this.categoria_id_modelo) {
          return this.getImageSrc(imagen); 
        }
      }
    }
    return undefined;
  }

  get huecos(): atributos_expositores[] | undefined {
   
  
    if (!this.expositor.atributos_expositores || this.expositor.atributos_expositores.length === 0) {
      return undefined;
    }
    
  
    // Simplemente devuelve el array de FormGroup filtrados, sin crear un nuevo FormArray
    const huecosArray: atributos_expositores[] = this.expositor.atributos_expositores.filter((atributoExpositor: atributos_expositores) => {
     
      return atributoExpositor.alto != null && atributoExpositor.ancho != null && atributoExpositor.x_start != null && atributoExpositor.y_start != null;
    });
  
    return huecosArray.length > 0 ? huecosArray : undefined;
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

  createGroup(atributo: atributos_expositores, fillColor: string = 'white', strokeColor: string = 'black', lineStrokeColor: string = 'black'): fabric.Group {
    const x = atributo.x_start || 0;
    const y = atributo.y_start|| 0;
    const w = atributo.ancho || 0;
    const h = atributo.alto|| 0;
    const angulo = atributo.angulo || 0;
  
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
      selectable: false,
      evented: false,
      angle: angulo,
    });
  
    return group;
  }
 
  drawRectangles(): void {
   
    if (this.huecos) {
      this.huecos.forEach((atributoExpositor, index) => {
        if (!this.groupRefs[index]) { // Si no existe un grupo para este índice, créalo
          const grupo = this.createGroup(atributoExpositor);
          this.groupRefs[index] = grupo; // Almacenar referencia al grupo
          this.canvas.add(grupo);

          //busco imagen
         const elemento = atributoExpositor.elemento;
          if (elemento && elemento?.id) {
            const imagen: string =  this.getImageSrc(elemento?.imagenes.url);  
   

            //si tiene imagen, la dibujo
            if (imagen && imagen != "") {
              this.addImageOnGroup(index, imagen);

            }
           
          }
        } else { // Si el grupo ya existe, actualiza sus propiedades
          this.updateGroupProperties(index, 'white', 'black', 'black');
        }
      });
      this.canvas.renderAll();
    }
  }

  

  addImageOnGroup(index_hueco	: number, imagen: string) {

    let imagenUrl : string = imagen
    !imagen.startsWith(this.urlService.url_imagenes_referencia) ?  imagenUrl = this.urlService.url_imagenes_referencia + imagen: imagenUrl = imagen;
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
      const topAnterior = grupo.top;
      const leftAnterior = grupo.left;
      grupo.addWithUpdate(img);
      grupo.set({
        top: topAnterior,
        left: leftAnterior
      })
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
 


  

 

  getImageSrc(imagen: string) {
    let imagenUrl : string = imagen
    !imagen.startsWith(this.urlService.url_imagenes_referencia) ?  imagenUrl = this.urlService.url_imagenes_referencia + imagen: imagenUrl = imagen;
    return imagenUrl;

  }
    
ngOnInit():void{
  this.expositor = this.dialogConfig.data.expositor;
  console.log(this.expositor);
}
 ngAfterViewInit(): void {

  if (this.huecos && this.huecos.length > 0) {
    console.log(this.huecos.values);
    this.initCanvas();
    this.drawRectangles();
  }else{
    console.log('No se encontraron huecos');
  }
 
 }


}
