import { Component, Input, OnInit, Output } from '@angular/core';
import { huecoCreacion } from '../../../interfaces/huecoCreacion';

@Component({
  selector: 'app-PasoHuecosForm',
  templateUrl: './PasoHuecosForm.component.html',
  styleUrls: ['./PasoHuecosForm.component.css']
})
export class PasoHuecosFormComponent implements OnInit {

  @Input() imagen: string;
  @Output() huecos:huecoCreacion[] = [];
  constructor() { }

  ngOnInit() {
    console.log(this.imagen);
  }

}
