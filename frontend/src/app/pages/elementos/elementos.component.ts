 
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { elementos } from 'src/app/interfaces/elementos'; 
import { ConfirmationService, MessageService } from 'primeng/api';
import { categorias_elementos } from 'src/app/interfaces/categoria';
import { FormControl, FormGroup } from '@angular/forms';
import { timeout } from 'rxjs';
import { EnumService } from 'src/app/servicios/enum/enum.service';



import { productos } from 'src/app/interfaces/productos';


@Component({
  selector: 'app-elementos',
  templateUrl: './elementos.component.html',
  styleUrls: ['./elementos.component.css']
})



export class ElementosComponent implements OnInit{

  
  @Output() archivoSeleccionadoChange = new EventEmitter<{ archivo: File }>();
  @Input() id_elemento_selected: number = 0;
  @Input() mostrarDialogoNuevoElemento: boolean = false;

  carritoVisible: boolean = false;
  cargando_procesamiento: boolean = false;
  imputSearch!: string;
  elementos!: elementos[];
  elementosSeleccionados!: elementos[];
  elementosTodos!: elementos[];
  nuevoElemento!: elementos;
  archivoSeleccionado!: File;

  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';
 
  opcionesCategoria: string[] = [];
  categoriaSeleccionada!: categorias_elementos;
  categorias_elementos !: categorias_elementos[];


  opcionesCatalogo!: any[];
  opcionCatalogoSeleccionado = {estado: 'Catalogados'};
 
  mostrar: boolean = false;

  tableStateOption: any[] = [{label:'Dispositivos', icon: 'pi pi-mobile', value: 'dispositivos',  styleClass: "optionColorVodafone" }, {label:'Carteles' ,icon: 'pi pi-book', value: 'cartel', styleClass: "optionColorVodafone" }];
  tableSelected:string = 'dispositivos';

  verRemarcado: boolean = false;


  constructor( private elementosService: ElementosService, private enumService: EnumService, private messageService: MessageService, private confirmationService: ConfirmationService) { }




  verRemarcadorExpositor(){
    this.verRemarcado = true;
  }
  manejarVerRemarcado(event: Event){
    this.verRemarcado = false;
  }



  inicializaElementos() {
    this.elementosService.getElementos().subscribe((elementos: elementos[]) => {
      this.elementos = elementos;
      this.elementos = this.elementos.filter(elemento => elemento.activo == true);
      this.elementosTodos = elementos;
      console.log("elementos", elementos);
 //     this.resetTabla();
    });
  } 
 
  AbrirnuevoElemento() {
 

    this.nuevoElemento = {
      id: 0,

      imagenes: {
        url:"",
        id_imagen: 0
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
 
  manejarMostrarDialogo(valor: boolean): void {
    this.inicializaElementos();
    this.mostrarDialogoNuevoElemento = false;
    console.log('Valor recibido: ', valor);
  }
 

  activarDesactivarElementos(elemento: elementos) {

    this.elementosService.cambiarActivo(elemento.id, !elemento.activo).subscribe((elemento: elementos) => {
     this.inicializaElementos();
      if(!elemento.activo){
        this.messageService.add({ severity: 'success', summary: 'Modificado con exito', detail: 'Elemento descatalogado' });
      }else{
        this.messageService.add({ severity: 'success', summary: 'Modificado con exito', detail: 'Elemento añadido al catalogo' });
      }
      setTimeout(() => {
        this.cambiarOpcionBusqueda(0);
      },100)
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
    this.cambiarOpcionBusqueda(0);
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
    this.elementos = this.elementosTodos;
    
    const estadoSeleccionado = $event.value?.estado;
    const nombreCategoriaSeleccionada = $event.value?.nombre;

    if (estadoSeleccionado) {
        if (estadoSeleccionado === 'Catalogados') {
            this.elementos = this.elementos.filter(elemento => elemento.activo == true);
        } else if (estadoSeleccionado === 'Descatalogados') {
            this.elementos = this.elementos.filter(elemento => elemento.activo == false);
        }
    } else if (nombreCategoriaSeleccionada) {
        if (this.categorias_elementos.find(opcion => opcion.nombre === nombreCategoriaSeleccionada)) {
            // this.categoriaSeleccionada = $event.value?.nombre;
        }
    }

    if (this.categoriaSeleccionada && this.categoriaSeleccionada.nombre) {
        this.elementos = this.elementos.filter(elemento => elemento.categorias_elementos.nombre == this.categoriaSeleccionada.nombre);
    }
}
 

  inicializaCategorias_elementos(){
    this.enumService.getCategorias_elementos().subscribe((elementos: categorias_elementos[]) => {
      this.categorias_elementos = elementos; 
      const index = this.categorias_elementos.findIndex((elemento) => elemento.id == 3);
      this.categorias_elementos.splice(index, 1);
    })
  }


  
  ngOnInit(): void { 
    this.inicializaElementos();
    this.inicializaCategorias_elementos(); 

    this.opcionesCatalogo = [
      {estado: 'Catalogados'}, 
      {estado: 'Descatalogados'}
    ]

 
  
 

  }

  
}