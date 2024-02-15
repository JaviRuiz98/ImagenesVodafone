import { Component, Input, OnInit } from '@angular/core';
import { Expositor } from 'src/app/interfaces/expositor';

@Component({
  selector: 'app-historialExpositores',
  templateUrl: './historialExpositores.component.html',
  styleUrls: ['./historialExpositores.component.css']
})
export class HistorialExpositoresComponent implements OnInit {

  
  url_imagenes_referencias: string = 'http://validador-vf.topdigital.local/imagenes/imagenesReferencia/';

  @Input() expositores: Expositor[] = [];


  nombreFiltro: string = '';


  constructor() { }

  ngOnInit() {
    
  
  }



 
 
}
