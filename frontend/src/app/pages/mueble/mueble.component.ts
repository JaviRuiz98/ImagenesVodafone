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
import { EditarExpositorComponent } from './components/editarExpositor/editarExpositor.component';
import { UrlService } from 'src/app/servicios/url/url.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mueble',
  templateUrl: './mueble.component.html',
  styleUrls: ['./mueble.component.css']
})
export class MuebleComponent implements OnInit {


  constructor( private urlService: UrlService, private muebleService: MueblesService, public dialogService: DialogService, public messageService: MessageService, private config: PrimeNGConfig) { }
  
  muebles: muebles[] = [];

  mostrarDialogoEditarElementosMueble: boolean[] = [];

 
  url_imagenes_referencias: string = this.urlService.url_imagenes_referencia;


  nombreFiltro: string = '';

  

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
  
}

