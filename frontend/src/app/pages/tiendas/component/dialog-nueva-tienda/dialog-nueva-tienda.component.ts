import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges  } from '@angular/core';

import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';

import { tienda } from 'src/app/interfaces/tienda';
import { muebles } from 'src/app/interfaces/muebles';
@Component({
  selector: 'app-dialog-nueva-tienda',
  templateUrl: './dialog-nueva-tienda.component.html',
  styleUrls: ['./dialog-nueva-tienda.component.css'],
})

export class DialogNuevaTiendaComponent{

  @Input() verFormularioNuevaTienda: boolean = false;
  @Input() vistaCrearMueble: boolean = false;
  @Input() tiendaSelected: tienda = {} as tienda;

  @Output() verFormularioNuevaTiendaChange = new EventEmitter<boolean>();
  @Output() actualizarListadoTiendasChange: EventEmitter<void> = new EventEmitter<void>();

  parametrosSteps: any; 
  activeIndex: number = 0;
  contenidoBotonCrearEditarTienda: string = 'Siguiente';
  editarTiendaCreada: boolean = false;
  crearTienda: boolean = false;

  nuevaTienda: tienda = {} as tienda;
  
  listaTodosMueblesDisponiblesOrdenados: muebles[] = [];
  listaMueblesNuevaTienda: muebles[] = [];

  constructor(private TiendasService: TiendasService, private MueblesService: MueblesService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.verFormularioNuevaTienda && this.verFormularioNuevaTienda === true) {
      this.inicializarSteps();
      this.iniciarFormularioNuevaTienda();
      this.getAllMuebles();
    }
  }
  iniciarFormularioNuevaTienda(){
    this.activeIndex = 0;
    this.editarTiendaCreada = false;
    this.listaMueblesNuevaTienda = [];
    this.contenidoBotonCrearEditarTienda = 'Crear Tienda';
    this.nuevaTienda = {} as tienda;
  }

  getAllMuebles(){
    this.MueblesService.getAllMuebles().subscribe((listaTodosMueblesDisponibles: muebles[]) => {
      this.listaTodosMueblesDisponiblesOrdenados = this.ordenarListaAlfabeticamente(listaTodosMueblesDisponibles, 'nombre');
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
    if(this.activeIndex < 4){
      this.activeIndex++;
    } else{
      if(this.contenidoBotonCrearEditarTienda == 'Crear Tienda'){
        this.TiendasService.newTienda(this.nuevaTienda, this.listaMueblesNuevaTienda).subscribe((response: any) => {
          this.actualizarListadoTiendasChange.emit();
          this.verFormularioNuevaTienda = false;
        })
      } else{
        this.TiendasService.editarTienda(this.nuevaTienda, this.listaMueblesNuevaTienda).subscribe((response: any) => {
          this.verFormularioNuevaTienda = false;
        })
      }
    }
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
