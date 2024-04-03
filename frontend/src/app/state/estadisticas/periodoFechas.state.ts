import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Definir la interfaz para el estado de periodoFechas
interface IPeriodoFechasState {
  loading: boolean;
  periodoFechas?: Date[]; // Asumiendo que periodo_fechas es un array de fechas
}

@Injectable({
  providedIn: 'root',
})
export class PeriodoFechasState {
  private initialState: IPeriodoFechasState = {
    loading: false,
    periodoFechas: [],
  };

  private _state: BehaviorSubject<IPeriodoFechasState> = new BehaviorSubject(this.initialState);

  public readonly loading$: Observable<boolean> = this._state.asObservable().pipe(map(state => state.loading));
  public readonly periodoFechas$: Observable<Date[]> = this._state.asObservable().pipe(map(state => state.periodoFechas));

  private get state() {
    return this._state.getValue();
  }

  public reset(): void {
    this._state.next(this.initialState);
  }

  // Método para actualizar periodoFechas
  public updatePeriodoFechas(newPeriodoFechas: Date[]): void {
    this._state.next({ ...this.state, periodoFechas: newPeriodoFechas, loading: false });
  }
}
