import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';

import { muebles } from 'src/app/interfaces/muebles';

@Component({
  selector: 'app-agregar-mueble-a-tienda',
  templateUrl: './agregar-mueble-a-tienda.component.html',
  styleUrls: ['./agregar-mueble-a-tienda.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    PickListModule
  ],
})

export class AgregarMuebleATiendaComponent {
  
  @Input() listaMueblesDisponiblesTablaIzquierda:  muebles[] = [];
  @Input() listaMueblesAsignadosTablaDerecha:  muebles[] = [];

  constructor() { }

}
