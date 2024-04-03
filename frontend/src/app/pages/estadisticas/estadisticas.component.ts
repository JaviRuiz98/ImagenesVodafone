import { Component } from '@angular/core';
import { PeriodoFechasState } from 'src/app/state/periodoFechas.state';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {

  periodo_fechas: Date[] | undefined;

  apartados = [
    {
      id: 'auditorias',
      label: 'Auditorías',
      icon: 'pi pi-fw pi-book',
      command: () => {
        this.seleccionarApartado('auditorias');
      }
    },
    // {
    //   id: 'tiendas',
    //   label: 'Tiendas',
    //   icon: 'pi pi-fw pi-home',
    //   command: () => {
    //     this.seleccionarApartado('tiendas');
    //   }
    // },
    {
      id: 'muebles',
      label: 'Mobiliario',
      icon: 'pi pi-fw pi-cog',
      command: () => {
        this.seleccionarApartado('muebles');
      }
    },
    // {
    //   id: 'elementos',
    //   label: 'Elementos',
    //   icon: 'pi pi-fw pi-box',
    //   command: () => {
    //     this.seleccionarApartado('elementos');
    //   }
    // },
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

  constructor( private periodoFechasState: PeriodoFechasState ) {  }

  seleccionarApartado(id: string): void {
    this.apartado_seleccionado = id;
  }

  filtrarPorFecha() {
    if(this.periodo_fechas[1] !== null) {
      this.periodoFechasState.updatePeriodoFechas(this.periodo_fechas);
      console.log('fechas almacenadas en estado', this.periodo_fechas);
    }
  }
}
