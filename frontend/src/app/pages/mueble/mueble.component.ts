import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { muebles } from 'src/app/interfaces/muebles';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { FormMuebleComponent } from './components/formMueble/formMueble.component';
import { HistorialExpositoresComponent } from './components/historialExpositores/historialExpositores.component';
import { mueblesVisualizacion } from './interfaces/muebleVisualizacion';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-mueble',
  templateUrl: './mueble.component.html',
  styleUrls: ['./mueble.component.css']
})
export class MuebleComponent implements OnInit {


  muebles: mueblesVisualizacion[] = [];
 



  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';


  nombreFiltro: string = '';



  muebleFormVisibility: boolean = false;

  ref: DynamicDialogRef | undefined;

  @ViewChild('miTabla') miTabla!: Table;

  constructor( private muebleService: MueblesService, public dialogService: DialogService, public messageService: MessageService, private config: PrimeNGConfig) { }

  ngOnInit() {
    this.config.setTranslation({
      startsWith: 'Empieza con',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Acaba en',
      equals: 'Igual',
      notEquals: 'No igual',
      noFilter: 'Sin filtro',
      lt: 'Menor que',
  });

    this.loadMuebles();
  }
  private loadMuebles() {
   this.muebleService.getAllMuebles().subscribe(muebles => {
     
     this.muebles = this.separarExpositoresSegúnCategoria(muebles);
    
   
   })
  }

  separarExpositoresSegúnCategoria(muebles:muebles[]): mueblesVisualizacion[] {
     return  muebles.map(mueble => {

      const expositoresCarteles = mueble.expositores.filter(expositor => expositor.categoria === 'carteles');

      const expositoresDispositivos = mueble.expositores.filter(expositor => expositor.categoria === 'dispositivos');

      return {
        id: mueble.id,
        nombre_mueble: mueble.nombre_mueble,
        expositores: mueble.expositores,
        numero_expositores_carteles: expositoresCarteles.length,
        numero_expositores_dispositivos: expositoresDispositivos.length,
        expositores_carteles: expositoresCarteles,
        expositores_dispositivos: expositoresDispositivos
      };
    });
    
  }

  resetTabla() {
    this.miTabla.reset();
  }
  clearTabla()  {
    this.miTabla.clear();
  }


  editMueble(mueble: muebles) {

    this.ref = this.dialogService.open(FormMuebleComponent, {
      header: 'Editar mueble ' + mueble.nombre_mueble ,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        mueble: mueble
      }
  });

  this.ref.onClose.subscribe(() => {
    this.loadMuebles();
  })

  this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Pantalla completa' });
  });
  }

  nuevoMueble() {
    this.ref = this.dialogService.open(FormMuebleComponent, {
      header: 'Crea un nuevo mueble',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
  });

  this.ref.onClose.subscribe(() => {
    this.loadMuebles();
  })

  this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Pantalla completa' });
  });
  }

  showHistorial(mueble: muebles) {
    this.ref = this.dialogService.open(HistorialExpositoresComponent, {
      header: 'Historial de expositores de ' + mueble.nombre_mueble,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    })
    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Pantalla completa' });
  });
  }



}
