import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { tienda, tiendaCreacion } from '../../interfaces/tienda';  
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

  newTienda(nuevaTienda: tiendaCreacion, listaNuevosMuebles: muebles[]): Observable<boolean> {
    const formData = new FormData();
    formData.append('parametros', JSON.stringify(nuevaTienda)); 
    formData.append('listaNuevosMuebles', JSON.stringify(listaNuevosMuebles));
    formData.append('imagenesPlanos', nuevaTienda.archivo_imagen);
    return this.http.post<boolean>(`${this.API_URI}/tiendas`, formData);
  }

  editarTienda(tienda: tiendaCreacion, listaNuevosMuebles: muebles[]): Observable<boolean> {
    const formData = new FormData();
    formData.append('listaNuevosMuebles', JSON.stringify(listaNuevosMuebles));
    formData.append('imagenesPlanos', tienda.archivo_imagen);
    return this.http.put<boolean>(`${this.API_URI}/tiendas/` + tienda.id, formData);
  }
  activarDesactivarTienda(tienda: tienda, parametro: string): Observable<tienda> {
    const datos = {
      tienda: tienda,
      parametro: parametro
    }
    return this.http.put<tienda>(`${this.API_URI}/tiendas/`, datos);
  }

  guardarPosicionMueble(datos_posicion_mueble: posiciones_muebles_tienda): Observable<boolean> {
    return this.http.post<boolean>(`${this.API_URI}/posicion_mueble`, datos_posicion_mueble);
  }

  eliminarPosicionMueble(id_posicion_mueble: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.API_URI}/desactivar_mueble_tienda`, {id_posicion_mueble});
  }
}
