import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { atributos_expositores } from 'src/app/interfaces/atributos_expositores';
import { expositores } from 'src/app/interfaces/expositores';
import { huecoCreacion } from '../../interfaces/huecoCreacion';

@Component({
  selector: 'app-asignarHuecos',
  templateUrl: './asignarHuecos.component.html',
  styleUrls: ['./asignarHuecos.component.css']
})
export class AsignarHuecosComponent implements OnInit {

  @Input() imagen: string;
  @Output() imagenChange = new EventEmitter<huecoCreacion[]>();

  constructor() { }

  ngOnInit() {
  }



}
