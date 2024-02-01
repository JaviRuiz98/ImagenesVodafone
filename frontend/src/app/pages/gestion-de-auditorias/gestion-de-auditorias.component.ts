import { Component } from '@angular/core';
import { BarraMenuComponent } from 'src/app/componentes/barra-menu/barra-menu.component';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-gestion-de-auditorias',
  templateUrl: './gestion-de-auditorias.component.html',
  styleUrls: ['./gestion-de-auditorias.component.css'],
  standalone: true,
  imports: [
    BarraMenuComponent,
    CardModule,
    PanelModule,
    ButtonModule
  ],
})
 


export class GestionDeAuditoriasComponent {


  tiendaTitle: string = "FRANQ982"

  constructor() { }
 

  nuevaAuditoria() {

  }

  volver() {
    window.location.href = '/';
  }

}
