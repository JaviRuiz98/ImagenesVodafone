import { Component, OnInit } from '@angular/core';
import { muebles } from 'src/app/interfaces/muebles';
import { MueblesService } from 'src/app/servicios/muebles/muebles.service';


@Component({
  selector: 'app-mueble',
  templateUrl: './mueble.component.html',
  styleUrls: ['./mueble.component.css']
})
export class MuebleComponent implements OnInit {

  muebles: muebles[] = [];
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';
  constructor( private muebleService: MueblesService  ) { }

  ngOnInit() {
    this.loadMuebles();
  }
  private loadMuebles() {
   this.muebleService.getAllMuebles().subscribe(muebles => {
     this.muebles = muebles;
     console.log("muebles", this.muebles);
   })
  }



}
