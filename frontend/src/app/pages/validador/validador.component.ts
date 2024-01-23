import { Component, OnInit } from '@angular/core';
import { TiendasService } from 'src/app/servicios/tiendas/tiendas.service';
import { ProcesamientoService } from 'src/app/servicios/procesamiento-imagenes/procesamiento-services.service';

import { tienda } from 'src/app/interfaces/tienda';


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

  cargando_procesamiento: boolean = false;


  constructor( private tiendasService: TiendasService,
    private procesamientoService: ProcesamientoService
    ) {}

  inicializaImagenesReferencia(sfid: string ) {
    this.tiendasService.getTienda(sfid).subscribe( ( data: tienda ) => {

      this.tienda.id_tienda = data.id_tienda;
      this.tienda.sfid = data.sfid;


      for (let i = 0; i < data.muebles.length; i++) {
        if (data.muebles[i].expositores.length > 0) {
          this.tienda.muebles.push(data.muebles[i]);
          
        }
      }
      console.log("tienda",this.tienda.muebles[0].expositores[0].procesados_imagenes[0].respuestas_carteles);
    })
  }

  ngOnInit(): void {
    this.inicializaImagenesReferencia(this.sfid);    
  }

  recibirFile(event: {archivo:File}, id_expositor_selected: number) {
    this.imagenAProcesar = event.archivo;
    this.cargando_procesamiento = true;
    console.log(id_expositor_selected)

    this.procesamientoService.postProcesamientoImagenes(id_expositor_selected, this.imagenAProcesar).subscribe( 
      ( response ) => {
        console.log("response", response);
        this.cargando_procesamiento = false;
    })
  }

}
