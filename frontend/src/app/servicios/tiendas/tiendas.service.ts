import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { tienda } from '../../interfaces/tienda';  
import { Expositor } from '../../interfaces/expositor';
import { muebles } from 'src/app/interfaces/muebles';


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
    return this.http.post<boolean>(`${this.API_URI}/tiendas/`+tienda.id_tienda, listaNuevosMuebles);
  }

  desactivarTienda(tienda: tienda): Observable<boolean> {
    return this.http.post<boolean>(`${this.API_URI}/tiendas/`+tienda.id_tienda, false);
  }











  //CODIGO ANTIGUO
  getTiendaBySfid(sfid: string): Observable<tienda> {
    return this.http.get<tienda>(`${this.API_URI}/tiendas/${sfid}`);
  }

  getTiendas(id_tienda?: number): Observable<tienda[]> {
    let url = `${this.API_URI}/tiendas`;
    if (id_tienda){
      url += `?id_tienda=${id_tienda}`
    }
    return this.http.get<tienda[]>(url);
  }



 
  getExpositores(id_mueble: number): Observable<Expositor[]> {
    const params =  { id_mueble: id_mueble };
    return this.http.get<Expositor[]>(`${this.API_URI}/expositores`, { params: params });
  }

 

  getUrl(id_imagen: number): Observable<string> {
    const params =  { id_imagen: id_imagen };
    return this.http.get<string>(`${this.API_URI}/url`, { params: params });
  }

  
}
