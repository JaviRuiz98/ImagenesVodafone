import { Component, OnInit } from '@angular/core';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { ProcesamientoService } from 'src/app/servicios/procesamiento-imagenes/procesamiento-services.service';

import { tienda } from 'src/app/interfaces/tienda';
import { procesados_imagenes } from 'src/app/interfaces/procesados_imagenes';


@Component({
  selector: 'app-validador',
  templateUrl: './validador.component.html',
  styleUrls: ['./validador.component.css']
})

export class ValidadorComponent implements OnInit{
  url_imagenes_referencias: string = 'http://localhost:3000/imagenesReferencia/';

  tienda: tienda = {
    id_tienda: 0,
    sfid: " ",
    muebles: []
  };

  sfid = "FRANQ982";

  imagenAProcesar = new File([""], "");

  array_cargas_procesamiento : boolean[] = [];


  constructor( 
    private tiendasService: TiendasService,
    private procesamientoService: ProcesamientoService
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

  getSeverityCartel(result: string) {
    switch (result) {
        case 'muy alta':
            return 'success' as string;
 
        case 'alta':
            return 'success' as string;
 
        case 'media':
            return 'warning' as string;
        case 'baja':
            return 'danger' as string;
        case 'muy baja':
            return 'danger' as string;
        case 'ninguna':
            return 'danger' as string;
       
        default:
            return undefined;
    }
  };


  ngOnInit(): void {
    this.inicializaImagenesReferencia(this.sfid);    
  }

  async recibirFile(event: {archivo:File}, id_expositor_selected: number) {
    this.imagenAProcesar = event.archivo;
    this.array_cargas_procesamiento[id_expositor_selected]= true;
    console.log(id_expositor_selected)

    this.procesamientoService.postProcesamientoImagenes(id_expositor_selected, this.imagenAProcesar).subscribe( 
      ( response: procesados_imagenes ) => {
        console.log("response", response);
        this.array_cargas_procesamiento[id_expositor_selected] = false;
        this.actualizarProcesamientoEnTienda(id_expositor_selected, response);
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
