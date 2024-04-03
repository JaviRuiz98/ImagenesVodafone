import { compileInjectable } from '@angular/compiler';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { FiltroState } from 'src/app/state/estadisticas/elementoSeleccionados.state';
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


  isFiltrado: boolean = false;
  showingSelectElementosFiltroDialog: boolean = false;

  //Debería meterlo en el estado de filtros? crear uno nuevo? ya me dices
  apartado_seleccionado: string;
  private apartadoSeleccionadoSubject = new BehaviorSubject<string>("auditorias");
  public apartado_seleccionado$ = this.apartadoSeleccionadoSubject.asObservable();


  loading$:Observable<boolean>;

  constructor( private filtroState: FiltroState ) { 
    this.loading$ = this.filtroState.loading$;
   }


  ngOnInit(): void {
    combineLatest([this.filtroState.fechaIsFiltrado$ , this.filtroState.elementoIsFiltrado$,this.apartado_seleccionado$
    ]).subscribe(([fechaIsFiltrado, elementoIsFiltrado, apartadoSeleccionado]) => {
      this.updateIsFiltrado(fechaIsFiltrado, elementoIsFiltrado,apartadoSeleccionado);
    });
  }


  updateIsFiltrado(fechaIsFiltrado: boolean, elementoIsFiltrado: boolean, apartadoSeleccionado: string) {


    switch (apartadoSeleccionado) {
      case 'auditorias':
        this.isFiltrado = fechaIsFiltrado;
        break;
      case 'muebles':
        this.isFiltrado = elementoIsFiltrado || fechaIsFiltrado;
        break;
      case 'uniformes':
        this.isFiltrado = false;
        break;
      case 'ia':
        this.isFiltrado = false;
        
    }
  }

  seleccionarApartado(id: string): void {
    this.apartadoSeleccionadoSubject.next(id);
  }
  //Filtros
  
  filtrarPorFecha() {
    if(!!this.periodo_fechas && this.periodo_fechas[1] !== null) {
      this.periodo_fechas[1] = new Date(this.periodo_fechas[1].getFullYear(), this.periodo_fechas[1].getMonth() + 1, 0);
      this.filtroState.updatePeriodoFechas(this.periodo_fechas);
      console.log('fechas almacenadas en estado', this.periodo_fechas);
    }
  }

  
  onSelectedElementosIds($event: number[]) {
    this.showingSelectElementosFiltroDialog = false;
    this.filtroState.updateElementosSeleccionados($event);  
  }
  
  limpiarFiltros() {
    this.periodo_fechas = undefined;
    this.filtroState.updateElementosSeleccionados([]);
    this.filtroState.updatePeriodoFechas([]);
  }
  
  
}
