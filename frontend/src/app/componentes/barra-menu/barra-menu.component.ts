import { Component, Input } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.css'],
  standalone: true,
  imports: [
    SidebarComponent
  ],
  providers: [
     
  ],
  
})
export class BarraMenuComponent {

  @Input() tiendaTitle: string = "";
  
}
