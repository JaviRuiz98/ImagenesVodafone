import { Component, OnInit } from '@angular/core';
import { TiendasServices } from 'src/app/servicios/tiendas/tiendas-services.service';


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
  }

  sfid = "FRANQ982";


  constructor( private tiendasService: TiendasServices) {}

  inicializaImagenesReferencia(sfid: string ) {
    this.tiendasService.getTienda(sfid).subscribe( ( data: tienda ) => {
      this.tienda = data;
      console.log("tienda",this.tienda);
      console.log("data", data);

    })

  }

  ngOnInit(): void {
    this.inicializaImagenesReferencia(this.sfid);

  }

}
