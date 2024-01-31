import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.css'],
  standalone: true,
  imports: [
    ButtonModule
  ],
})
export class BarraMenuComponent {

  @Input() tiendaTitle: string = "";

}
