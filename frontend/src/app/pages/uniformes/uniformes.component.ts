import { Component, OnInit } from '@angular/core';
import { UniformesModule } from './uniformes.module';
import { productos } from 'src/app/interfaces/productos';
import { UniformesService } from 'src/app/servicios/uniformes/uniformes.service';
 


@Component({
  selector: 'app-uniformes',
  templateUrl: './uniformes.component.html',
  styleUrls: ['./uniformes.component.css']
})



export class UniformesComponent implements OnInit {

  layout: any = 'list';

  productos: productos[];

  constructor(private uniformesService: UniformesService) { }





  ngOnInit() {

  }

  inicializaProductos() {
    this.uniformesService.getProductos().subscribe((productos: productos[]) => {
      this.productos = productos;
    });
  }


}
