import { Component } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {

  //apartados = ['Auditorías', 'Tiendas', 'Muebles', 'Elementos', 'Uniformes'];

  apartados = [
    {
      label: 'Auditorías',
      icon: 'pi pi-fw pi-file'
    },
    {
      label: 'Tiendas',
      icon: 'pi pi-fw pi-file'
    },
    {
      label: 'Muebles',
      icon: 'pi pi-fw pi-file'
    },
    {
      label: 'Elementos',
      icon: 'pi pi-fw pi-file'
    },
    {
      label: 'Uniformes',
      icon: 'pi pi-fw pi-file'
    }
  ]
}
