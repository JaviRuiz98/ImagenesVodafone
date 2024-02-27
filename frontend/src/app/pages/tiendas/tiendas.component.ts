import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';

import { tienda } from 'src/app/interfaces/tienda';
import { muebles } from 'src/app/interfaces/muebles';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css'],
  providers: [MessageService, ConfirmationService]
})

export class TiendasComponent implements OnInit{

  imagenesRef: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  tiendas: tienda[] = [];
  tiendasFiltradas: tienda[] = []
  tiendasListaTodosLosMuebles: tienda[] = [];
  nuevaTienda: tienda = {} as tienda;
  
  listaTodosMuebles: muebles[] = [];
  listaMueblesNuevaTienda: muebles[] = [];
  listaMueblesMostrar: muebles[] = [];
  listaMueblesFiltrar: muebles[] = [];

  verFormularioNuevaTienda: boolean = false;
  editarTiendaCreada: boolean = false;
  parametrosSteps: any; 
  activeIndex: number = 0;

  
  botonCrearEditarTienda: string = 'Crear Tienda';
  nombreFiltro: string = '';
  nombreFiltroListaTodosMuebles: string = '';
  mensajeActivarDesactivar: string = 'Desactivar';
  mensajeDialog: string = '¿Seguro que desea desactivar la tienda?';
  cabeceraListaDerecha: string = '';
  cabeceraListaDerechaNuevaTienda: string = 'Muebles Seleccionados';
  cabeceraListaDerechaEditarTienda: string = 'Muebles Actuales';


  constructor(private TiendasService: TiendasService, private MueblesService: MueblesService, private messageService: MessageService, private ConfirmationService: ConfirmationService){}
  ngOnInit(): void {
    this.getAllTiendas();
    this.getAllMuebles();
    this.inicializarSteps();
  }
  iniciarFormularioNuevaTienda(){
    this.getAllMuebles();
    this.verFormularioNuevaTienda = true;
    this.editarTiendaCreada = false;
    this.activeIndex = 0;
    this.listaMueblesNuevaTienda = [];
    this.botonCrearEditarTienda = 'Crear Tienda';
    this.nuevaTienda = {} as tienda;
    this.cabeceraListaDerecha = this.cabeceraListaDerechaNuevaTienda;
  }
  getAllTiendas(){
    this.TiendasService.getAllTiendas().subscribe((response: tienda[]) => {
      this.tiendas = response;
      this.tiendasListaTodosLosMuebles = response;
    })
  }
  getAllMuebles(){
    this.MueblesService.getAllMuebles().subscribe((response: muebles[]) => {
      this.listaTodosMuebles = this.ordenarListaAlfabeticamente(response, 'nombre');
      this.listaMueblesMostrar = this.listaTodosMuebles;
    });
  }
  inicializarSteps(){
    this.parametrosSteps = [
      {
        label: 'Información Corporativa y de Identificación',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Ubicación Geográfica',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Tipo, Estado y Servicios Ofrecidos',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        label: 'Muebles',
        command: (event: any) => {
          this.activeIndex = 3;
        }
      },
      {
        label: 'Confirmar',
        command: (event: any) => {
          this.activeIndex = 4;
        }
      }
    ];
  }

  botonSiguiente(){
    if(this.activeIndex < 5){
      this.activeIndex++;
    } else{
      if(this.botonCrearEditarTienda == 'Crear Tienda'){
        if(this.listaMueblesNuevaTienda.length > 1){
          this.listaMueblesNuevaTienda = this.ordenarListaAlfabeticamente(this.listaMueblesNuevaTienda, 'nombre_mueble');
        }
        this.TiendasService.newTienda(this.nuevaTienda, this.listaMueblesNuevaTienda).subscribe((response: any) => {
          this.tiendasListaTodosLosMuebles = response;
        })
      } else{
        this.TiendasService.editarTienda(this.nuevaTienda, this.listaMueblesNuevaTienda).subscribe((response: any) => {
        })
      }
    }
  }
  botonAtras(){
    if(this.activeIndex > 0){
      this.activeIndex--;
    }
  }
  editarTienda(tienda: tienda){
    const listaMueblesDisponibles = this.eliminarMueblesSeleccionados(this.listaTodosMuebles, this.listaMueblesNuevaTienda)
    this.nuevaTienda = tienda;
    this.cabeceraListaDerecha = this.cabeceraListaDerechaEditarTienda;
    this.botonCrearEditarTienda = 'Editar tienda';
    this.MueblesService.getMueblesTiendaByIdTienda(tienda.id).subscribe((response: muebles[]) => {
      this.listaMueblesNuevaTienda = this.ordenarListaAlfabeticamente(response, 'nombre');
      this.listaMueblesMostrar = this.eliminarMueblesSeleccionados(this.listaTodosMuebles, response);
    })
    this.activeIndex = 1;
    this.verFormularioNuevaTienda = true;
    this.editarTiendaCreada = true;
  }

  filtrarPorSfid() {
    this.tiendasFiltradas = this.filterByNombre(this.tiendas);
    this.tiendasListaTodosLosMuebles = this.tiendasFiltradas;
  }
  filterByNombre(tiendas: tienda[]): tienda[] {
    return tiendas.filter(tiendas => tiendas.sfid.toLowerCase().includes(this.nombreFiltro.toLowerCase()));
  }

  confirmarCambio(tienda: tienda) {
    this.ConfirmationService.confirm({
      message: this.mensajeDialog,
      header: this.mensajeActivarDesactivar,
      icon: 'pi pi-info-circle', 
      acceptLabel: 'Sí', 
      rejectLabel: 'No',
      accept: () => {
        this.TiendasService.activarDesactivarTienda(tienda).subscribe((response: tienda) => {
          const index = this.tiendas.findIndex(t => t.id === tienda.id && t.sfid === tienda.sfid);
          if (index !== -1) {
            this.tiendas[index].activo = response.activo;
          }
        })
        const mensajeDetalle = tienda.activo ? 'La tienda ha sido desactivada.' : 'La tienda ha sido activada.';
        this.messageService.add({ severity: 'success', summary: 'Confirmado!', detail: mensajeDetalle });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'La tienda no ha tenido cambios.' });
            break;
        } 
      },
    });
  }

  ordenarListaAlfabeticamente(lista: any[], campo: string) {
    const listaOrdenada = lista.sort((a, b) => a[campo].localeCompare(b[campo]));
    return listaOrdenada;
  }
  eliminarMueblesSeleccionados(listaCompleta: muebles[], listaMueblesSeleccionados: muebles[]){
    const idsLista2 = new Set(listaMueblesSeleccionados.map(mueble => mueble.id));
    const listaFiltrada = listaCompleta.filter((mueble) => !idsLista2.has(mueble.id));
    return listaFiltrada;
  }
}
