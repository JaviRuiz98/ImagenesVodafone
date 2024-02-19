 
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ExpositoresService } from 'src/app/servicios/expositores/expositores.service';
import { elementos } from 'src/app/interfaces/elementos';
import { imagenes } from 'src/app/interfaces/imagenes';
import { ExpositorModule } from './expositor.module';
import { regiones } from 'src/app/interfaces/regiones';
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
  expositores!: elementos[];
  expositoresSeleccionados!: elementos[];
  expositoresTodos!: elementos[];
  nuevoExpositor!: elementos;
  archivoSeleccionado!: File;

  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  opcionesMostrar!: any[];
  opcionSeleccionada = {estado: 'Todos'};

  regiones!: regiones[];
  mostrar: boolean = false;

  tableStateOption: any[] = [{label:'Dispositivos', icon: 'pi pi-mobile', value: 'dispositivos',  styleClass: "optionColorVodafone" }, {label:'Carteles' ,icon: 'pi pi-book', value: 'cartel', styleClass: "optionColorVodafone" }];
  tableSelected:string = 'dispositivos';



  constructor(private router: Router, private expositoresService: ExpositoresService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  inicializaExpositores() {
    this.expositoresService.getExpositores().subscribe((expositores: elementos[]) => {
      this.expositores = expositores;
      this.expositoresTodos = expositores;
      console.log("expositores", expositores);
      this.resetTabla();
    });
  }

  resetTabla() {
    this.expositores = this.expositoresTodos;
    if(this.tableSelected == "dispositivos"){
      this.expositores = this.expositores.filter(elementos => elementos.categoria == 2);
      
    }else{
      this.expositores = this.expositores.filter(elementos => elementos.categoria == 1);
    }
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
      categoria: 0,
      procesados_imagenes: []
    };
    this.mostrarDialogoNuevoExpositor = true;
 
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



  activarDesactivarExpositores(expositor: elementos) {
    //this.opcionMostrarCambia

    this.expositoresService.cambiarActivo(expositor.id, !expositor.activo).subscribe((expositor: elementos) => {
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
    this.expositores = this.expositoresTodos;
    if(this.imputSearch == ""){
      this.inicializaExpositores();
    }else{
      if (this.expositores !== undefined) {
        this.expositores = this.expositores.filter(expositor => expositor.nombre?.includes(this.imputSearch));
        console.log("expositores flitrados")
      }
    }


  }

  onDialogHidden() {
    this.mostrar = false; 
  }


  cambiarOpcionBusqueda($event: any) {
    if($event.value == "Todos"){
      this.inicializaExpositores();
    }else if($event.value == "Catalogados"){
      this.expositores = this.expositoresTodos.filter(expositor => expositor.activo == true);
    }else if($event.value == "Descatalogados"){
      this.expositores = this.expositoresTodos.filter(expositor => expositor.activo == false);
    }

  }

 
  


  ngOnInit(): void {
    this.inicializaExpositores();

    this.expositoresService.getAllRegiones().subscribe((regiones: regiones[]) => {
      this.regiones = regiones;
    });


    this.opcionesMostrar = [
      {estado: 'Todos'}, 
      {estado: 'Catalogados'}, 
      {estado: 'Descatalogados'}
    ]


  }

  
}
