import { Component, OnInit } from '@angular/core';
import { TiendasServices } from 'src/app/servicios/tiendas/tiendas-services.service';
import { ProcesamientoService } from 'src/app/servicios/procesamiento-imagenes/procesamiento-services.service';

import { tienda } from 'src/app/interfaces/tienda';


@Component({
  selector: 'app-validador',
  templateUrl: './validador.component.html',
  styleUrls: ['./validador.component.css']
})

export class ValidadorComponent implements OnInit{
  url_imagenes_referencias: string = 'http://localhost:3000/imagenesReferencia/';
  url_imagenes_procesadas: string = 'http://localhost:3000/imagenesProcesadas/';

  tienda: tienda = {
    id_tienda: 0,
    sfid: " ",
    muebles: []
  };

  sfid = "FRANQ982";

  imagenAProcesar = new File([""], "");


  constructor( private tiendasService: TiendasServices,
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
      console.log("tienda",this.tienda);
      console.log("data", data);

    })

  }


  getSeverityConteo(numero_telefonos: number, huecos_esperados: number) {
    if (numero_telefonos == huecos_esperados) {
      return 'success';
    } else {
      return 'warning';
    }
  }

  ngOnInit(): void {
    this.inicializaImagenesReferencia(this.sfid);

  }

  recibirFile(event: {archivo:File}){
    this.imagenAProcesar = event.archivo;
    console.log("imagenAProcesar", this.imagenAProcesar)

    this.procesamientoService.postProcesamientoImagenes(this.tienda.id_tienda, this.imagenAProcesar).subscribe( 
      ( response ) => {
        console.log("response", response);
    })
  }

}
