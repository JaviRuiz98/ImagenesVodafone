import { Component, OnInit } from '@angular/core';
import { SelectorImagenesService } from 'src/app/servicios/selector-imagenes/selector-imagenes.service';

@Component({
  selector: 'app-validador',
  templateUrl: './validador.component.html',
  styleUrls: ['./validador.component.css']
})

export class ValidadorComponent implements OnInit{

  array_elementos: any[] = [];


  constructor() {
    this.array_elementos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   }

  ngOnInit(): void {
  }

}
