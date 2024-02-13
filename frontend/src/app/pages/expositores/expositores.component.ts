 
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ExpositoresService } from 'src/app/servicios/expositores/expositores.service';
import { Expositor } from 'src/app/interfaces/expositor';
import { imagenes } from 'src/app/interfaces/imagenes';
import { ExpositorModule } from './expositor.module';

import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-expositores',
  templateUrl: './expositores.component.html',
  styleUrls: ['./expositores.component.css'],
  providers: [ MessageService, ConfirmationService],  
})


export class ExpositoresComponent implements OnInit {
  

  @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();
  @Input() id_expositor_selected: number = 0;
  @Input() mostrarDialogoNuevoExpositor: boolean = false;

  cargando_procesamiento: boolean = false;

  expositores!: Expositor[];
  expositoresSeleccionados!: Expositor[];
  nuevoExpositor!: Expositor;
  archivoSeleccionado!: File;

  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';


  submitted: boolean = false;
  constructor(private router: Router, private expositoresService: ExpositoresService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  inicializaExpositores() {
    this.expositoresService.getExpositores().subscribe((expositores: Expositor[]) => {
      this.expositores = expositores;
      console.log("expositores", expositores);
    });
  }

 
  AbrirnuevoExpositor() {
 

    this.nuevoExpositor = {
      id: 0,
      nombre: '',
      activo: true,
      imagenes: {
        url:"",
        id_imagen: 0
      },
      categoria: "cartel",
      
      procesados_imagenes: []
    };
    this.mostrarDialogoNuevoExpositor = true;
    this.submitted = false;
  }

  recibirFile(event: {archivo:File}) {
    this.archivoSeleccionado = event.archivo;
    const imagenAProcesar = event.archivo;
    this.archivoSeleccionadoChange.emit({ archivo: imagenAProcesar });
    this.cargando_procesamiento = true;
  }


  cerrarDialog(value: boolean) {
    this.mostrarDialogoNuevoExpositor = false;
    this.cargando_procesamiento = true;
  }

  nuevoGuardar() {
    this.expositoresService.guardarExpositor(this.nuevoExpositor.nombre, this.nuevoExpositor.activo, this.archivoSeleccionado).subscribe((expositor: Expositor) => {
      this.inicializaExpositores();
    })



    //this.mostrarDialogoNuevoExpositor = false;
  }

  nuevoCanelar() {
    this.mostrarDialogoNuevoExpositor = false;
    
  }

  activarDesactivarExpositores() {
    
  }

  

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.expositores.length; i++) {
        if (this.expositores[i].id === parseInt(id)) {
            index = i;
            break;
        }
    }
    return index;
}



  ngOnInit(): void {
    this.inicializaExpositores();
 
  


  }


}
