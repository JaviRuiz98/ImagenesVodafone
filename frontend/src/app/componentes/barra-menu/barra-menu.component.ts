import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.css'],
  standalone: true,
  
})
export class BarraMenuComponent {

  @Input() tiendaTitle: string = "";
  
}
