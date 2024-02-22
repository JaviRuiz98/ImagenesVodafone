import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-PasoAsignarElementoForm',
  templateUrl: './PasoAsignarElementoForm.component.html',
  styleUrls: ['./PasoAsignarElementoForm.component.css']
})
export class PasoAsignarElementoFormComponent implements OnInit {

  @Input() imagen: string;
  constructor() { }

  ngOnInit() {
  }

}
