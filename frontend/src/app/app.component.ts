import { Component, OnInit } from '@angular/core';
import { TiendasService } from './servicios/tiendas/tiendas.service';
import { tienda } from './interfaces/tienda';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'frontend';
  tiendas:tienda[]=[];

  constructor(tiendasService: TiendasService) {  }


  ngOnInit(){
    
  }
}

