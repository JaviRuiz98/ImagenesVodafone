import { CommonModule } from '@angular/common';
import { Component, Input,  Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-selector-imagenes',
  templateUrl: './selector-imagenes.component.html',
  styleUrls: ['./selector-imagenes.component.css'],
  standalone: true,
  imports: [CommonModule],
})

export class SelectorImagenesComponent {

  @Input() cargando_procesado: boolean = false;
  // @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();
  @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();
  @ViewChild('dropArea') dropAreaRef!: ElementRef;
  @ViewChild('inputFile') inputFileRef!: ElementRef;
  @ViewChild('dragText') dragTextRef!: ElementRef;

  archivoSeleccionado: File | null = null;

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

  getImageSrc(file: File) {
    return file ? URL.createObjectURL(file) : '';
  }
}

  // onPageChange(event: PageEvent) {
  //   this.first = event.first;
  //   this.rows = event.rows;
  // }

  // elementosArrastrandoDentro(){
  //   this.dropArea.addEventListener('dragover', (event) => {
  //     event.preventDefault();
  //     this.dropArea.classList.add('active');
  //     if(this.dragText){
  //       this.dragText.textContent = "Suelta para subir";
  //     }
  //   })
  // }

  // elementosArrastrandoFuera(){
  //   this.dropArea.addEventListener('dragleave', (event) => {
  //     event.preventDefault();
  //     this.dropArea.classList.remove('active');
  //     if(this.dragText){
  //       this.dragText.textContent = "Arrastra y suelta imagenes";
  //     }
  //   })
  // }

  // soltarElementos(){
  //   this.dropArea.addEventListener('drop', (event) => {
  //     event.preventDefault();
  //     if(event.dataTransfer){
  //       //this.files = event.dataTransfer.files;
  //     }
  //     //this.showFile(this.files);
  //     this.dropArea.classList.remove('active');
  //     if(this.dragText){
  //       this.dragText.textContent = 'Arrastra y suelta imagenes';
  //     }    
  //   })
  // }

