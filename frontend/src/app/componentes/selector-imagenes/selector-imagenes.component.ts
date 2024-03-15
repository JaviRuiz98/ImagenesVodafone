import { CommonModule } from '@angular/common';
import { Component, Input,  Output, EventEmitter, ViewChild, ElementRef, SimpleChanges, OnChanges, } from '@angular/core';

import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-selector-imagenes',
  templateUrl: './selector-imagenes.component.html',
  styleUrls: ['./selector-imagenes.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressSpinnerModule,ImageModule],
})
 
export class SelectorImagenesComponent implements OnChanges {

 
  @Input() cargando_procesado: boolean = false;
  @Input() button_disabled?: boolean = false;
  @Input() opcion_multiple?: boolean = true; //  -----------------  por defecto opcion multiple  -----------------------------
  @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();
  @ViewChild('dropArea') dropAreaRef!: ElementRef;
  @ViewChild('inputFile') inputFileRef!: ElementRef;
  @ViewChild('dragText') dragTextRef!: ElementRef;

  archivoSeleccionado: File | null = null;
  mouseSobre: boolean = false;

 
  constructor() {}
 
  ngOnChanges(changes: SimpleChanges): void {
    if (this.cargando_procesado == false) {
      this.archivoSeleccionado = null;
   
    }
  }

  isCargando(){
    return this.cargando_procesado && this.archivoSeleccionado !=null;
  }
 
  seleccionarArchivo(event: any) {
    if (this.inputFileRef) {
      this.inputFileRef.nativeElement.click();

    }
  }

  listenChange(event: Event) {
    const input = this.inputFileRef.nativeElement as HTMLInputElement;
   
    if (input && input.files) {
     
      this.archivoSeleccionado = input.files[0];
      
      this.archivoSeleccionadoChange.emit({ archivo: this.archivoSeleccionado });

    }
  }

  getImagenUrl(): string {
    if (this.archivoSeleccionado) {
      return URL.createObjectURL(this.archivoSeleccionado);
    }
    return ''; // Puedes manejar el caso donde no hay imagen seleccionada aquí
  }

  onDragOver(event: DragEvent) {
    if (this.button_disabled != true){
      event.preventDefault();
      this.dropAreaRef.nativeElement.classList.add('active');
      event.stopPropagation();
      this.mouseSobre = true;

    }
  }
 
  borrarImagen() {
    this.archivoSeleccionado = null;
  }

onDragLeave(event: DragEvent) {
  if (this.button_disabled != true){
    event.preventDefault();
    event.stopPropagation();
    this.dropAreaRef.nativeElement.classList.remove('active');
    this.mouseSobre = false;
  }
}
 
  onDrop(event: DragEvent) {
    this.dropAreaRef.nativeElement.classList.remove('active');

      event.preventDefault();
      event.stopPropagation();
      this.mouseSobre = false;
  
      const transferencia = event.dataTransfer;
  
      if (!transferencia) {
          return;
      }
  
      const files = transferencia.files;
    
      if (files.length > 0) {
          const file = files[0];
          this.archivoSeleccionado = file;
          this.archivoSeleccionadoChange.emit({ archivo:file});
      }
  }

  onDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dropAreaRef.nativeElement.classList.add('dragover');
  }
  onDragEnd(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dropAreaRef.nativeElement.classList.remove('dragover');
}
 

  
}

