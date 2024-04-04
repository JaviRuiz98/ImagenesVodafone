import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Definir la interfaz para el estado de elemento seleccionado
interface IFiltroState {
  loading: boolean;
  elementosSeleccionados?: number[];  //array de ids
  periodoFechas?: Date[];// Asumiendo que periodo_fechas es un array de fechas
}

@Injectable({
  providedIn: 'root',
})
export class FiltroState {
  private initialState: IFiltroState = {
    loading: false,
    elementosSeleccionados: [],
    periodoFechas: [],
  };

  private _state: BehaviorSubject<IFiltroState> = new BehaviorSubject(this.initialState);

  public readonly loading$: Observable<boolean> = this._state.asObservable().pipe(map(state => state.loading));
  public readonly elementoSeleccionado$: Observable<number[]> = this._state.asObservable().pipe(map(state => state.elementosSeleccionados));
  public readonly periodoFechas$: Observable<Date[]> = this._state.asObservable().pipe(map(state => state.periodoFechas));

  public readonly isFiltrado$ : Observable<boolean> = this._state.asObservable().pipe(
    map(state => state.elementosSeleccionados.length > 0 || state.periodoFechas.length > 0)
  );
  public readonly fechaIsFiltrado$ : Observable<boolean> = this._state.asObservable().pipe(
    map(state => state.periodoFechas.length > 0)
  );

  public readonly elementoIsFiltrado$ : Observable<boolean> = this._state.asObservable().pipe(
    map(state => state.elementosSeleccionados.length > 0)
  );

  private get state() {
    return this._state.getValue();
  }

  public reset(): void {
    this._state.next(this.initialState);
  }

  // Método para actualizar periodoFechas
  public updateElementosSeleccionados(newElementos: number[]): void {
    this._state.next({ ...this.state, elementosSeleccionados: newElementos, loading: false });
  }
  public updatePeriodoFechas(newPeriodoFechas: Date[]): void {
    this._state.next({ ...this.state, periodoFechas: newPeriodoFechas, loading: false });
  }
  public updateLoading(newLoading: boolean): void {

    this._state.next({ ...this.state, loading: newLoading });
  }
  public loadSeconds(seconds: number): void {
    this._state.next({ ...this.state, loading: true });
    setTimeout(() => {
      this._state.next({ ...this.state, loading: false });
    }, seconds * 1000);
  }



}
