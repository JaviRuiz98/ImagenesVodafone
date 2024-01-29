import { Component, OnInit } from '@angular/core';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { ProcesamientoService } from 'src/app/servicios/procesamiento-imagenes/procesamiento-services.service';

import { tienda } from 'src/app/interfaces/tienda';
import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';

import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-validador',
  templateUrl: './validador.component.html',
  styleUrls: ['./validador.component.css'],
  providers: [MessageService]
})

export class ValidadorComponent implements OnInit{
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  tienda: tienda = {
    id_tienda: 0,
    sfid: " ",
    muebles: []
  };

  sfid = "FRANQ982";

  imagenAProcesar = new File([""], "");

  cargas_procesamiento : boolean[] = [];
  modos_visualizacion : string[] = [];


  constructor( 
    private tiendasService: TiendasService,
    private procesamientoService: ProcesamientoService,
    private messageService: MessageService
    ) {}

  async inicializaImagenesReferencia(sfid: string ) {
    this.tiendasService.getTienda(sfid).subscribe( ( data: tienda ) => {

      this.tienda.id_tienda = data.id_tienda;
      this.tienda.sfid = data.sfid;


      for (let i = 0; i < data.muebles.length; i++) {
        if (data.muebles[i].expositores.length > 0) {
          this.tienda.muebles.push(data.muebles[i]);
          
        }
      }
      console.log("tienda",this.tienda);
    })
  }


  ngOnInit(): void {
    this.inicializaImagenesReferencia(this.sfid);    
  }

  async recibirFile(event: {archivo:File}, id_expositor_selected: number) {
    this.imagenAProcesar = event.archivo;
    this.cargas_procesamiento[id_expositor_selected]= true;   
    this.messageService.add({ severity: 'info', summary: 'Cargando', detail: 'La imagen se está procesando' });

    this.procesamientoService.postProcesamientoImagenes(id_expositor_selected, this.imagenAProcesar).subscribe( 
      ( response: procesados_imagenes ) => {
        console.log("response", response);
        this.cargas_procesamiento[id_expositor_selected] = false;
        this.modos_visualizacion[id_expositor_selected] = 'historial';        
        this.actualizarProcesamientoEnTienda(id_expositor_selected, response);
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Imagen procesada correctamente' });
      }, ( error: any ) => {
        console.log("error", error);
        this.cargas_procesamiento[id_expositor_selected] = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error procesando imagen' });
    })
  }

  actualizarProcesamientoEnTienda(id_expositor_selected: number, response: procesados_imagenes) {
    for (const mueble of this.tienda.muebles) {
      const expositorIndex = mueble.expositores.findIndex((expositor) => expositor.id_expositor === id_expositor_selected);
      if (expositorIndex !== -1) {
        mueble.expositores[expositorIndex].procesados_imagenes.unshift(response);
        break; 
      }
    }
  }

}
