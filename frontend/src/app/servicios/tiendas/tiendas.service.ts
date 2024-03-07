import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { tienda } from '../../interfaces/tienda';  
import { muebles } from 'src/app/interfaces/muebles';
import { posiciones_muebles_tienda } from 'src/app/interfaces/posiciones_muebles_tienda';

@Injectable({
  providedIn: 'root'
})

export class TiendasService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient){ }

  getAllTiendas(): Observable<tienda[]> {
    return this.http.get<tienda[]>(`${this.API_URI}/tiendas`);
  }

  newTienda(nuevaTienda: tienda, listaNuevosMuebles: muebles[]): Observable<boolean> {
    const datosNuevaTienda = {
      sfid: nuevaTienda.sfid,
      listaNuevosMuebles: listaNuevosMuebles
    }
    return this.http.post<boolean>(`${this.API_URI}/tiendas`, datosNuevaTienda);
  }

  editarTienda(tienda: tienda, listaNuevosMuebles: muebles[]): Observable<boolean> {
    return this.http.post<boolean>(`${this.API_URI}/tiendas/` + tienda.id, listaNuevosMuebles);
  }

  activarDesactivarTienda(tienda: tienda): Observable<tienda> {
    return this.http.put<tienda>(`${this.API_URI}/tiendas/`, tienda);
  }

  guardarPosicionMueble(id_pertenencia_mueble_tienda: number, datos_posicion_mueble: posiciones_muebles_tienda): Observable<boolean> {
    return this.http.post<boolean>(`${this.API_URI}/posicion_mueble/` + id_pertenencia_mueble_tienda, datos_posicion_mueble);
  }
}
