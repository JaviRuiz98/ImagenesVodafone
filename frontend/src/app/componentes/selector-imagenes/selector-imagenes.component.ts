import { CommonModule } from '@angular/common';
import { Component, Input,  Output, EventEmitter, ViewChild, ElementRef, } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-selector-imagenes',
  templateUrl: './selector-imagenes.component.html',
  styleUrls: ['./selector-imagenes.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonModule],
})
 
export class SelectorImagenesComponent {
 
  @Input() cargando_procesado: boolean = false;
  // @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();
  @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();
 
  @ViewChild('dropArea') dropAreaRef!: ElementRef;
  @ViewChild('inputFile') inputFileRef!: ElementRef;
  @ViewChild('dragText') dragTextRef!: ElementRef;
 
  archivoSeleccionado: File | null = null;
  mouseSobre: boolean = false;
 
  constructor() {}
 
  ngOnChanges() {
    if (this.cargando_procesado == false) {
      this.archivoSeleccionado = null;
    }
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
 
  getImageSrc() {
    return this.archivoSeleccionado ? URL.createObjectURL(this.archivoSeleccionado) : '';
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dropAreaRef.nativeElement.classList.add('active');
    event.stopPropagation();
    this.mouseSobre = true;
  }
 

  onDragLeave(event: DragEvent) {
      event.preventDefault();
      event.stopPropagation();
      this.mouseSobre = false;
  }
 
  onDrop(event: DragEvent) {
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
          this.archivoSeleccionadoChange.emit({ archivo:file});
      }
  }
}