 
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { elementos } from 'src/app/interfaces/elementos';
import { regiones } from 'src/app/interfaces/regiones';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ElementosModule } from './elementos.modules';

@Component({
  selector: 'app-elementos',
  templateUrl: './elementos.component.html',
  styleUrls: ['./elementos.component.css'],
  providers: [ MessageService, ConfirmationService],  
})




export class ElementosComponent implements OnInit{


  @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();
  @Input() id_elemento_selected: number = 0;
  @Input() mostrarDialogoNuevoElemento: boolean = false;

  cargando_procesamiento: boolean = false;
  imputSearch!: string;
  elementos!: elementos[];
  elementosSeleccionados!: elementos[];
  elementosTodos!: elementos[];
  nuevoElemento!: elementos;
  archivoSeleccionado!: File;

  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  opcionesCategoria!: any[];
  categoriaSeleccionada = {tipo: 'Todos'};
  opcionesCatalogo!: any[];
  opcionCatalogoSeleccionado = {estado: 'Todos'};

  regiones!: regiones[];
  mostrar: boolean = false;

  tableStateOption: any[] = [{label:'Dispositivos', icon: 'pi pi-mobile', value: 'dispositivos',  styleClass: "optionColorVodafone" }, {label:'Carteles' ,icon: 'pi pi-book', value: 'cartel', styleClass: "optionColorVodafone" }];
  tableSelected:string = 'dispositivos';



  constructor(private router: Router, private elementosService: ElementosService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  inicializaElementos() {
    this.elementosService.getElementos().subscribe((elementos: elementos[]) => {
      this.elementos = elementos;
      this.elementosTodos = elementos;
      console.log("elementos", elementos);
      this.resetTabla();
    });
  }

  resetTabla() {
    this.elementos = this.elementosTodos;
    if(this.tableSelected == "dispositivos"){
      this.elementos = this.elementos.filter(elementos => elementos.categorias_elementos.id == 2);
      
    }else{
      this.elementos = this.elementos.filter(elementos => elementos.categorias_elementos.id == 1);
    }
  }

 
  AbrirnuevoElemento() {
 

    this.nuevoElemento = {
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
      categorias_elementos: {
        id: 0,
        nombre: ''
      },
      procesados_imagenes: []
    };
    this.mostrarDialogoNuevoElemento = true;
 
  }

  recibirFile(event: {archivo:File}) {
    this.archivoSeleccionado = event.archivo;
    const imagenAProcesar = event.archivo;
    this.archivoSeleccionadoChange.emit({ archivo: imagenAProcesar });
    this.cargando_procesamiento = true;
  }


  cerrarDialog(value: boolean) {
    this.mostrarDialogoNuevoElemento = false;
    this.cargando_procesamiento = true;
  }



  activarDesactivarElementos(elemento: elementos) {
    //this.opcionMostrarCambia

    this.elementosService.cambiarActivo(elemento.id, !elemento.activo).subscribe((elemento: elementos) => {
      this.inicializaElementos();
      if(!elemento.activo){
        this.messageService.add({ severity: 'success', summary: 'Modificado con exito', detail: 'Elemento descatalogado' });
      }else{
        this.messageService.add({ severity: 'success', summary: 'Modificado con exito', detail: 'Elemento añadido al catalogo' });
      }
    })
  }

  
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.elementos.length; i++) {
      if (this.elementos[i].id === parseInt(id)) {
          index = i;
          break;
      }
    }
    return index;
  }

  filterByNombre(event: Event) {
    this.elementos = this.elementosTodos;
    if(this.imputSearch == ""){
      this.inicializaElementos();
    }else{
      if (this.elementos !== undefined) {
        this.elementos = this.elementos.filter(elemento => elemento.nombre?.includes(this.imputSearch));
        console.log("elementos flitrados")
      }
    }


  }

  onDialogHidden() {
    this.mostrar = false; 
  }


  cambiarOpcionBusqueda($event: any) {

    if($event.value == "Todos"){
      this.inicializaElementos();
    }else if($event.value == "Catalogados"){
      this.elementos = this.elementosTodos.filter(elemento => elemento.activo == true);
    }else if($event.value == "Descatalogados"){
      this.elementos = this.elementosTodos.filter(elemento => elemento.activo == false);
    }

    

  }

 
  


  ngOnInit(): void {
    this.inicializaElementos();

    this.elementosService.getAllRegiones().subscribe((regiones: regiones[]) => {
      this.regiones = regiones;
    });


    this.opcionesCatalogo = [
      {estado: 'Todos'}, 
      {estado: 'Catalogados'}, 
      {estado: 'Descatalogados'}
    ]

    this.opcionesCategoria = [
      {clase: 'Carteles'},
      {clase: 'Dispositivos'},
      {clase: 'Modelos'}
    ]

  }

  
}
