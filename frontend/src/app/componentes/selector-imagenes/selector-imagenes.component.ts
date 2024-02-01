import { CommonModule } from '@angular/common';
import { Component, Input,  Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-selector-imagenes',
  templateUrl: './selector-imagenes.component.html',
  styleUrls: ['./selector-imagenes.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonModule],
})

export class SelectorImagenesComponent implements OnChanges {

  @Input() cargando_procesado: boolean = false;
 // @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();
 @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();
  @ViewChild('dropArea') dropAreaRef!: ElementRef;
  @ViewChild('inputFile') inputFileRef!: ElementRef;
  @ViewChild('dragText') dragTextRef!: ElementRef;

  archivoSeleccionado: File | null = null;

  file: File | null = null;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
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
    return this.file ? URL.createObjectURL(this.file) : '';
  }
}

 