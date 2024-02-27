 
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ElementosService } from 'src/app/servicios/elementos/elementos.service';
import { elementos } from 'src/app/interfaces/elementos';
import { regiones } from 'src/app/interfaces/regiones';
import { ConfirmationService, MessageService } from 'primeng/api';
import { categorias_elementos } from 'src/app/interfaces/categoria';
import { FormControl, FormGroup } from '@angular/forms';
import { timeout } from 'rxjs';
import { EnumService } from 'src/app/servicios/enum.service';

@Component({
  selector: 'app-elementos',
  templateUrl: './elementos.component.html',
  styleUrls: ['./elementos.component.css']
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
 
  opcionesCategoria: string[] = [];
  categoriaSeleccionada!: categorias_elementos;
  categorias_elementos !: categorias_elementos[];


  opcionesCatalogo!: any[];
  opcionCatalogoSeleccionado = {estado: 'Todos'};

  regiones!: regiones[];
  mostrar: boolean = false;

  tableStateOption: any[] = [{label:'Dispositivos', icon: 'pi pi-mobile', value: 'dispositivos',  styleClass: "optionColorVodafone" }, {label:'Carteles' ,icon: 'pi pi-book', value: 'cartel', styleClass: "optionColorVodafone" }];
  tableSelected:string = 'dispositivos';



////7
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
 
  manejarMostrarDialogo(valor: boolean): void {
    this.mostrarDialogoNuevoElemento = false;
    console.log('Valor recibido: ', valor);
    // Aquí haces algo con el valor recibido
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
     // this.elementos.find(elementos => elementos.id === this.id_elemento_selected)?.activo = !this.elementos.find(elemento => elemento.id === this.id_elemento_selected)?.activo
      setInterval(() => {
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
    if(this.opcionesCatalogo.find((opcion) => opcion.estado === $event.value?.estado)){
  //    this.opcionCatalogoSeleccionado.estado = $event.value.nombre; da bugazo
    }else{

      if(this.categorias_elementos.find((opcion) => opcion.nombre === $event.value?.nombre)){
        //  this.categoriaSeleccionada = $event.value?.nombre;
      }
    }

    if(this.opcionCatalogoSeleccionado.estado == "Todos"){
   //   this.inicializaElementos();
      this.elementos = this.elementosTodos;
    }else if(this.opcionCatalogoSeleccionado.estado  == "Catalogados"){
      this.elementos = this.elementosTodos.filter(elemento => elemento.activo == true);
    }else if(this.opcionCatalogoSeleccionado.estado == "Descatalogados"){
      this.elementos = this.elementosTodos.filter(elemento => elemento.activo == false);
    }

    if(this.categoriaSeleccionada.nombre  == "Carteles"){ 
      this.elementos = this.elementos.filter(elemento => elemento.categorias_elementos.nombre == "Carteles");
    }else if(this.categoriaSeleccionada.nombre  == "Dispositivos"){
      this.elementos = this.elementos.filter(elemento => elemento.categorias_elementos.nombre == "Dispositivos");
    }else if(this.categoriaSeleccionada.nombre  == "Otros"){
      this.elementos = this.elementos.filter(elemento => elemento.categorias_elementos.nombre == "Otros");
    }
  }

  // this.regiones = regiones;
  // this.Dropdown_regiones = regiones.map((region) => region.nombre);
 
  inicializaCategorias_elementos(){
    this.enumService.getCategorias_elementos().subscribe((elementos: categorias_elementos[]) => {
      this.categorias_elementos = elementos; 
      this.categoriaSeleccionada = this.categorias_elementos[0];
    })
  }


  
  ngOnInit(): void { 
    this.inicializaElementos();
    this.inicializaCategorias_elementos();

    this.enumService.getAllRegiones().subscribe((regiones: regiones[]) => {
      this.regiones = regiones;
    });


    this.opcionesCatalogo = [
      {estado: 'Todos'}, 
      {estado: 'Catalogados'}, 
      {estado: 'Descatalogados'}
    ]

    // this.opcionesCategoria = new FormGroup({
    //   categoriaSeleccionada: new FormControl<categorias_elementos | null>(null)
    // });
  
 

  }

  
}
