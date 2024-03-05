import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';

import { tienda } from 'src/app/interfaces/tienda';
import { muebles } from 'src/app/interfaces/muebles';
@Component({
  selector: 'app-editar-tienda',
  templateUrl: './editar-tienda.component.html',
  styleUrls: ['./editar-tienda.component.css']
})
export class EditarTiendaComponent implements OnInit {

  @Input() verFormularioEditarTienda: boolean = false;
  @Input() tiendaSelected: tienda = {} as tienda;

  @Output() verFormularioEditarTiendaChange = new EventEmitter<boolean>();

  parametrosSteps: any; 
  activeIndex: number = 0;
  contenidoBotonCrearEditarTienda: string = 'Siguiente';

  listaMueblesTiendaTablaDerecha: muebles[] = [];
  listaMueblesMostrarTablaIzquierda: muebles[] = [];
  listaMueblesFiltrar: muebles[] = [];

  cabeceraListaDerecha: string = 'Muebles Seleccionados';

  constructor(private TiendasService: TiendasService, private MueblesService: MueblesService) { }

  ngOnInit(): void {
    this.iniciarFormularioEditarTienda();
    this.inicializarSteps();
    this.getMueblesTienda();
  }
  ngOnChanges(): void {
    if (this.verFormularioEditarTienda && this.verFormularioEditarTienda === true) {
      this.inicializarSteps();
      this.iniciarFormularioEditarTienda();
      this.getMueblesTienda();
    }
  }
  iniciarFormularioEditarTienda(){
    this.activeIndex = 0;
    this.contenidoBotonCrearEditarTienda = 'Editar Tienda';
  }
  getMueblesTienda(){
    this.MueblesService.getAllMuebles().subscribe((response: muebles[]) => {
      const listaTodosMuebles = this.ordenarListaAlfabeticamente(response, 'nombre');
      this.MueblesService.getMueblesTiendaByIdTienda(this.tiendaSelected.id).subscribe((response: muebles[]) => {
        this.listaMueblesMostrarTablaIzquierda = this.eliminarMueblesSeleccionados(listaTodosMuebles, response);
        this.listaMueblesTiendaTablaDerecha = response;
      })
    });
  }
  inicializarSteps(){
    this.parametrosSteps = [
      {
        label: 'Tipo, Estado y Servicios Ofrecidos',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Muebles',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Confirmar',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      }
    ];
  }
  botonSiguiente(){
    if(this.activeIndex < 2){
      this.activeIndex++;
    } else{
      this.TiendasService.editarTienda(this.tiendaSelected, this.listaMueblesTiendaTablaDerecha).subscribe((response: any) => {
        this.verFormularioEditarTienda = false;
      })
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
