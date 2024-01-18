import { Component, OnInit } from '@angular/core';
import { PageEvent } from '../../interfaces/selector-imagenes';
import { SelectorImagenesService } from '../../servicios/selector-imagenes/selector-imagenes.service';

@Component({
  selector: 'app-selector-imagenes',
  templateUrl: './selector-imagenes.component.html',
  styleUrls: ['./selector-imagenes.component.css'],
  standalone: true,
  imports: [],
})
export class SelectorImagenesComponent implements OnInit {

  private dropArea!: HTMLInputElement;
  private input!: HTMLInputElement | null;
  private dragText!: HTMLElement | null;
  first: number = 0;
  rows: number = 5;

  constructor(private SelectorImagenesService: SelectorImagenesService) { }

  ngOnInit(): void {
    this.dropArea = document.querySelector('.drop-area') as HTMLInputElement;
    this.input = this.dropArea.querySelector('#input-file');
    this.dragText = this.dropArea.querySelector('h2');
  }
  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }
  onArchivoSeleccionado(archivo: File) {
    //this.archivo = this.fileBase;
  }

  seleccionarArchivo(event: any) {
    if (this.input) {
      this.input.click();
    }
  }

  listenChange(){
    if (this.input) {
      this.input.addEventListener('change', (event) => {
        //this.files = (event.target as HTMLInputElement).files;
        this.dropArea.classList.add('active');
        //this.showFile(this.files);
      });
    }
  }
  elementosArrastrandoDentro(){
    this.dropArea.addEventListener('dragover', (event) => {
      event.preventDefault();
      this.dropArea.classList.add('active');
      if(this.dragText){
        this.dragText.textContent = "Suelta para subir";
      }
    })
  }

  elementosArrastrandoFuera(){
    this.dropArea.addEventListener('dragleave', (event) => {
      event.preventDefault();
      this.dropArea.classList.remove('active');
      if(this.dragText){
        this.dragText.textContent = "Arrastra y suelta imagenes";
      }
    })
  }

  soltarElementos(){
    this.dropArea.addEventListener('drop', (event) => {
      event.preventDefault();
      if(event.dataTransfer){
        //this.files = event.dataTransfer.files;
      }
      //this.showFile(this.files);
      this.dropArea.classList.remove('active');
      if(this.dragText){
        this.dragText.textContent = 'Arrastra y suelta imagenes';
      }    
    })
  }
  mandarImagenes(){
    
  }
}
