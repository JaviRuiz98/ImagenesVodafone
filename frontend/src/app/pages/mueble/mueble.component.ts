import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { muebles } from 'src/app/interfaces/muebles';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';
import { FormMuebleComponent } from './components/formMueble/formMueble.component';
import { HistorialExpositoresComponent } from './components/historialExpositores/historialExpositores.component';
import { PrimeNGConfig } from 'primeng/api';
import { expositores } from 'src/app/interfaces/expositores';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { UrlService } from 'src/app/servicios/url/url.service';
import { Subject } from 'rxjs';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ViewExpositorComponent } from './components/viewExpositor/viewExpositor.component';

@Component({
  selector: 'app-mueble',
  templateUrl: './mueble.component.html',
  styleUrls: ['./mueble.component.css']
})
export class MuebleComponent implements OnInit {



  constructor( private urlService: UrlService, private muebleService: MueblesService, public dialogService: DialogService, public messageService: MessageService, private config: PrimeNGConfig) { }
  
  muebles: muebles[] = [];

  mostrarDialogoEditarElementosMueble: boolean[] = [];
  overlayPanelMessage: string;

 
  url_imagenes_referencias: string = this.urlService.url_imagenes_referencia;

  nombreFiltro: string = '';
  mueblesFiltrados: muebles[] = [];

  

  muebleFormVisibility: boolean = false;
  //dynamic dialog
  ref: DynamicDialogRef | undefined;
  private dataSubject  = new Subject<expositores>();
 
  

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
     console.log(muebles);
     this.muebles = muebles; 
     this.mueblesFiltrados = muebles;
   })
  }

  editMueble(mueble: muebles, showing_asignar_expositores_index?:number) {
    this.ref = this.dialogService.open(FormMuebleComponent, {
      header: 'Editar mueble ' + mueble.nombre ,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        mueble: mueble, 
        showing_asignar_expositores_index: showing_asignar_expositores_index!= undefined? showing_asignar_expositores_index : undefined
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
      header: 'Historial de expositores de ' + mueble.nombre,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        id_mueble: mueble.id
      }
    })
    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Pantalla completa' });
    });
  }

  showViewExpositor( expositor:expositores) {
    this.ref = this.dialogService.open(ViewExpositorComponent, {
      header: 'Visualización de elementos' ,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        expositor: expositor, 
      }
    });
    
   
    
    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Pantalla completa' });
    });
  }

  getImagenModelo(expositor: expositores): string | undefined {
    const atributoModelo: atributos_expositores | undefined = expositor.atributos_expositores.find((atributo) => atributo.categorias_elementos.id === 3);
    
    
    if (atributoModelo && atributoModelo.elemento) {
      return atributoModelo.elemento.imagenes.url;
    } else {
      return undefined;
    }
    
  }
  tieneModelo(atributos_expositores: atributos_expositores[]): boolean {
    const atributoModelo: atributos_expositores | undefined = atributos_expositores.find((atributo) => atributo.categorias_elementos.id === 3);
    return atributoModelo !== undefined;
  }

  filtrarPorNombreDeMueble() {
    this.mueblesFiltrados = this.filterByNombre(this.muebles);
  }

  
  filterByNombre(muebles: muebles[]): muebles[] {
    return muebles.filter(muebles => muebles.nombre.toLowerCase().includes(this.nombreFiltro.toLowerCase()));
  }

  showOverlayPanel(op: OverlayPanel, message: string) {
    this.overlayPanelMessage = message;
    op.toggle(event);
  }

  hideOverlayPanel(op: OverlayPanel) {
    op.toggle(event);
  }
 

  shouldShowOverlayPanel(): boolean {
    return this.overlayPanelMessage !== undefined;
  }

  shouldOpenFirstAccordion(mueble: muebles) {
    let res:boolean = false;
    if (mueble.expositores.length > 0) {
      //Para que tenga sentido, si tiene seleccionado un elemento pero no tiene elementos, no deberá tener mas de un expositor 𝓒𝓸𝓷𝓬𝓮𝓹𝓽𝓾𝓪𝓵𝓶𝓮𝓷𝓽𝓮
      if (!this.tieneModelo(mueble.expositores[0].atributos_expositores) ) {
        //será true si tiene al menos un elementos
        if (mueble.expositores[0].atributos_expositores.length > 0) {
          res = true;
        }
      }
    } 
    return res;
}
    

  

}

