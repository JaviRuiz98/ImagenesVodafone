import { Component, OnInit } from '@angular/core';
import { TiendasServices } from 'src/app/servicios/tiendas/tiendas.service';



import { tienda } from 'src/app/interfaces/tienda';
 



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

  sfid = "FRANQ982";


  constructor( private tiendasService: TiendasServices) {}

  inicializaImagenesReferencia(sfid: string ) {
    this.tiendasService.getTienda(sfid).subscribe( ( data: tienda[] ) => {
      this.tienda = data[0];
      console.log(this.tienda.muebles);
      console.log(this.tienda.muebles[0].expositores[0].imagenes.url);

    })

  }

  ngOnInit(): void {
    this.inicializaImagenesReferencia(this.sfid);

  }

}
