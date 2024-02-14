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
  tiendasMostrar: tienda[] = [];
  nuevaTienda: tienda = {
    sfid: '',
    id_tienda: 0,
    pertenencia_mueble_tienda: [],
    activa: true
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
  mensajeActivarDesactivar: string = 'Desactivar';
  mensajeDialog: string = '¿Seguro que desea desactivar la tienda?';


  constructor(private TiendasService: TiendasService, private MueblesService: MueblesService, private messageService: MessageService, private ConfirmationService: ConfirmationService){}
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
    this.nuevaTienda = tienda;
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

  confirmarCambio(tienda: tienda) {
    console.log(tienda)
    this.ConfirmationService.confirm({
      message: this.mensajeDialog,
      header: this.mensajeActivarDesactivar,
      icon: 'pi pi-info-circle', 
      acceptLabel: 'Sí', 
      rejectLabel: 'No',
      accept: () => {
        this.TiendasService.activarDesactivarTienda(tienda).subscribe((response: tienda) => {
          const index = this.tiendas.findIndex(t => t.id_tienda === tienda.id_tienda && t.sfid === tienda.sfid);
          if (index !== -1) {
            this.tiendas[index].activa = response.activa;
          }
        })
        const mensajeDetalle = tienda.activa ? 'La tienda ha sido desactivada.' : 'La tienda ha sido activada.';
        this.messageService.add({ severity: 'info', summary: 'Confirmado!', detail: mensajeDetalle });
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
}
