import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { ExpositoresService } from 'src/app/servicios/expositores/expositores.service';

import { tienda } from 'src/app/interfaces/tienda';
import { muebles } from 'src/app/interfaces/muebles';
import { response } from 'express';
@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css'],
  providers: [MessageService]
})

export class TiendasComponent implements OnInit{

  imagenesRef: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  tiendas: tienda[] = [];
  tiendasFiltradas: tienda[] = []
  tiendasMostrar: tienda[] = [];
  nuevaTienda: tienda = {
    sfid: '',
    id_tienda: 0,
    pertenencia_mueble_tienda: []
  };
  verFormularioNuevaTienda: boolean = false;
  sfidInput: string = '';
  comunidadInput: string = '';
  parametrosSteps: any; //TIPAR CON LABEL Y ROUTERLINK
  activeIndex: number = 0;
  listaTodosMuebles: muebles[] = [];
  listaMueblesNuevaTienda: muebles[] = [];
  editarTiendaCreada: boolean = false;
  crearEditarTienda: string = 'Crear Tienda';
  nombreFiltro: string = '';

  constructor(private TiendasService: TiendasService, private MueblesService: MueblesService, private messageService: MessageService, private ExpositoresService: ExpositoresService){}
  ngOnInit(): void {
    this.TiendasService.getAllTiendas().subscribe((response: tienda[]) => {
      this.tiendas = response;
      this.tiendasMostrar = response;
    })
    this.MueblesService.getAllMuebles().subscribe((response: muebles[]) => {
      this.listaTodosMuebles = response;
    })
    this.parametrosSteps = [
      {
        label: 'Datos Tienda',
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
  iniciarFormularioNuevaTienda(){
    this.verFormularioNuevaTienda = true;
    this.activeIndex = 0;
    this.listaMueblesNuevaTienda = [];
    this.editarTiendaCreada = false;
    this.crearEditarTienda = 'Crear Tienda';
    this.sfidInput = '';
    this.comunidadInput = '';
  }
  botonSiguiente(){
    if(this.sfidInput === '' || this.comunidadInput === ''){
      this.messageService.add({severity:'error', summary:'Error!', detail:'Los campos necesarios no estan completos.'});
    } else{
      if(this.activeIndex < 2){
        this.activeIndex++;
      } else{
        this.nuevaTienda.sfid = this.sfidInput;
        this.verFormularioNuevaTienda = false;
        if(this.crearEditarTienda == 'Crear Tienda'){
          this.TiendasService.newTienda(this.nuevaTienda, this.listaMueblesNuevaTienda).subscribe((response: any) => {
            this.tiendasMostrar = response;
          })
        } else{
          this.TiendasService.editarTienda(this.nuevaTienda, this.listaMueblesNuevaTienda).subscribe((response: any) => {
            this.tiendasMostrar = response;
          })
        }
      }
    }
  }
  botonAtras(){
    if(this.activeIndex > 0){
      this.activeIndex--;
    }
  }
  editarTienda(tienda: tienda){
    this.crearEditarTienda = 'Editar tienda';
    this.sfidInput = tienda.sfid;
    this.comunidadInput = 'prueba';
    this.MueblesService.getMueblesTiendaByIdTienda(tienda.id_tienda).subscribe((response: muebles[]) => {
      this.listaMueblesNuevaTienda = response;
    })
    this.activeIndex = 1;
    this.verFormularioNuevaTienda = true;
    this.editarTiendaCreada = true;
  }
  filtrarPorSfid() {
    this.tiendasFiltradas = this.filterByNombre(this.tiendas);
    this.tiendasMostrar = this.tiendasFiltradas;
  }
  filterByNombre(tiendas: tienda[]): tienda[] {
    return tiendas.filter(tiendas => tiendas.sfid.toLowerCase().includes(this.nombreFiltro.toLowerCase()));
  }
}
