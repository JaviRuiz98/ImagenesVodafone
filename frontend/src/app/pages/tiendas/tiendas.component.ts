import { Component, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { LocalStorageService } from 'src/app/servicios/local-storage/localStorage.service';
import { Router } from '@angular/router';

import { tienda } from 'src/app/interfaces/tienda';
import { muebles } from 'src/app/interfaces/muebles';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css'],
})

export class TiendasComponent implements OnInit{

  @Output() verFormularioNuevaTienda: boolean = false;
  @Output() verFormularioEditarTienda: boolean = false;
  @Output() vistaCrearMueble: boolean = false;

  imagenesRef: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  tiendas: tienda[] = [];
  tiendasFiltradas: tienda[] = []
  tiendasListaTodosLosMuebles: tienda[] = [];
  tiendaSelected: tienda = {} as tienda;

  nombreFiltro: string = '';
  nombreFiltroListaTodosMuebles: string = '';
  mensajeActivarDesactivar: string = 'Desactivar';
  mensajeDialog: string = '¿Seguro que desea desactivar la tienda?';

  constructor(
    private TiendasService: TiendasService, 
    private messageService: MessageService, 
    private ConfirmationService: ConfirmationService,
    private router: Router,
    private localStorageService: LocalStorageService
  ){}
  
  ngOnInit(): void {
    this.getAllTiendas();
  }

  getAllTiendas(){
    this.TiendasService.getAllTiendas().subscribe((response: tienda[]) => {
      this.tiendas = response;
      this.tiendasListaTodosLosMuebles = response;
    })
  }

  filtrarPorSfid() {
    this.tiendasFiltradas = this.filterByNombre(this.tiendas);
    this.tiendasListaTodosLosMuebles = this.tiendasFiltradas;
  }
  filterByNombre(tiendas: tienda[]): tienda[] {
    return tiendas.filter(tiendas => tiendas.sfid.toLowerCase().includes(this.nombreFiltro.toLowerCase()));
  }

  confirmarCambio(tienda: tienda, parametro: string) {
    this.mensajesActivarDesactivar(parametro, tienda);
    this.ConfirmationService.confirm({
      message: this.mensajeDialog,
      header: this.mensajeActivarDesactivar,
      icon: 'pi pi-info-circle', 
      acceptLabel: 'Sí', 
      rejectLabel: 'No',
      accept: () => {
        this.TiendasService.activarDesactivarTienda(tienda, parametro).subscribe((response: tienda) => {
          const index = this.tiendas.findIndex(t => t.id === tienda.id && t.sfid === tienda.sfid);
          if (index !== -1) {
            this.tiendas[index][parametro] = response[parametro];
          }
        })
        const mensajeDetalle = 'Cambio de estado realizado con éxito!';
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
  mensajesActivarDesactivar(parametro: string, tienda: tienda){
    switch(parametro){
      case 'activa':
        if(tienda.activo){
          this.mensajeDialog = '¿Seguro que desea desactivar la tienda?';
          this.mensajeActivarDesactivar = 'Desactivar';
        } else{        
          this.mensajeDialog = '¿Seguro que desea activar la tienda?';
          this.mensajeActivarDesactivar = 'Activar';
        }
      break;
      default:
        this.mensajeDialog = '¿Seguro que desea cambiar el estado del apartado ' + parametro + '?';
        if(tienda[parametro]){
          this.mensajeActivarDesactivar = 'Desactivar';
        } else{
          this.mensajeActivarDesactivar = 'Activar';
        }
      break;
    }
  }
  editarTienda(tienda: tienda){
    this.tiendaSelected = tienda;
    this.verFormularioEditarTienda = true;
  }

  eliminarMueblesSeleccionados(listaCompleta: muebles[], listaMueblesSeleccionados: muebles[]){
    const idsLista2 = new Set(listaMueblesSeleccionados.map(mueble => mueble.id));
    const listaFiltrada = listaCompleta.filter((mueble) => !idsLista2.has(mueble.id));
    return listaFiltrada;
  }

  abrirPlanoTienda(id_tienda: number, tienda: tienda) {
    this.localStorageService.setItem('id_tienda', id_tienda);
    this.localStorageService.setItem('tienda', tienda);
    this.router.navigate(['/plano_tienda']);    
  }
}
