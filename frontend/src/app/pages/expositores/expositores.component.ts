 
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
  imputSearch!: string;
  expositores!: Expositor[];
  expositoresSeleccionados!: Expositor[];
  expositoresFiltrados!: Expositor[];
  nuevoExpositor!: Expositor;
  archivoSeleccionado!: File;

  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  opcionesMostrar!: any[];
  opcionSeleccionada = {estado: 'Todos'};


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

      imagenes: {
        url:"",
        id_imagen: 0
      },
      region: {
        id: 0,
        nombre: ''
      },
      nombre: '',
      activo: true,
      categoria: "",
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

  activarDesactivarExpositores(expositor: Expositor) {
    //this.opcionMostrarCambia

    this.expositoresService.cambiarActivo(expositor.id, !expositor.activo).subscribe((expositor: Expositor) => {
      
      this.inicializaExpositores();
      if(!expositor.activo){
        this.messageService.add({ severity: 'success', summary: 'Modificado con exito', detail: 'Expositor descatalogado' });
      }else{
        this.messageService.add({ severity: 'success', summary: 'Modificado con exito', detail: 'Expositor añadido al catalogo' });
      }
      
  
    })
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

  filterByNombre(event: Event) {
    if(this.imputSearch == ""){
      this.inicializaExpositores();
    }else{
      if (this.expositores !== undefined) {
        this.expositores = this.expositores.filter(expositor => expositor.nombre?.includes(this.imputSearch));
        console.log("expositores flitrados")
      }
    }


  }



  opcionMostrarCambia(){

  }

 



  ngOnInit(): void {
    this.inicializaExpositores();
    
    this.opcionesMostrar = [
      {estado: 'Todos'}, 
      {estado: 'Catalogados'}, 
      {estado: 'Descatalogados'}
    ]


  }

  
}
