import { Component } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {

  apartados = [
    {
      id: 'auditorias',
      label: 'Auditorías',
      icon: 'pi pi-fw pi-book',
      command: () => {
        this.seleccionarApartado('auditorias');
      }
    },
    {
      id: 'tiendas',
      label: 'Tiendas',
      icon: 'pi pi-fw pi-home',
      command: () => {
        this.seleccionarApartado('tiendas');
      }
    },
    {
      id: 'muebles',
      label: 'Muebles',
      icon: 'pi pi-fw pi-cog',
      command: () => {
        this.seleccionarApartado('muebles');
      }
    },
    {
      id: 'elementos',
      label: 'Elementos',
      icon: 'pi pi-fw pi-box',
      command: () => {
        this.seleccionarApartado('elementos');
      }
    },
    {
      id: 'uniformes',
      label: 'Uniformes',
      icon: 'pi pi-fw pi-tag',
      command: () => {
        this.seleccionarApartado('uniformes');
      }
    },
    {
      id: 'ia',
      label: 'IA',
      icon: 'pi pi-fw pi-wrench',
      command: () => {
        this.seleccionarApartado('ia');
      }
    }
  ];

  apartado_seleccionado: string = 'auditorias';

  seleccionarApartado(id: string): void {
    this.apartado_seleccionado = id;
  }
}
