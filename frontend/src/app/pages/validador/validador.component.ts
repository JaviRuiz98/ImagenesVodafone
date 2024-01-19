import { Component, OnInit } from '@angular/core';
import { TiendasServices } from 'src/app/servicios/tiendas-services.service';


import { tienda } from 'src/app/interfaces/tienda';
 


const sfid = "FRANQ982";

@Component({
  selector: 'app-validador',
  templateUrl: './validador.component.html',
  styleUrls: ['./validador.component.css']
})



export class ValidadorComponent implements OnInit{


  tienda: tienda = {
    id_tienda: 0,
    sfid: " ",
    muebles: []
  }




  constructor( private tiendasService: TiendasServices) {}

  inicializaImagenesReferencia(sfid: string ) {
    this.tiendasService.getTienda(sfid).subscribe( ( data: tienda[] ) => {
      this.tienda = data[0];
      console.log(this.tienda.muebles.length);
      console.log(this.tienda.muebles[0].expositores[0].imagenes.url);

    })

  }

  ngOnInit(): void {
    this.inicializaImagenesReferencia(sfid);

  }

}
