import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

import { tienda } from '../../interfaces/tienda';  
import { mueble } from '../../interfaces/muebles';
import { expositores } from '../../interfaces/expositor';
import { imagenes } from '../../interfaces/imagenes';

@Injectable({
  providedIn: 'root'
})

export class TiendasService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient){ }

  getTienda(sfid: string): Observable<tienda> {

    return this.http.get<tienda>(`${this.API_URI}/tiendas/${sfid}`);

  }

  getMuebles(id_tienda: number): Observable<mueble[]> {

    const params =  { id_tienda: id_tienda };
    return this.http.get<mueble[]>(`${this.API_URI}/muebles`);
  }
 
  getExpositores(id_mueble: number): Observable<expositores[]> {
    const params =  { id_mueble: id_mueble };
    return this.http.get<expositores[]>(`${this.API_URI}/expositores`, { params: params });
  }

 

  getUrl(id_imagen: number): Observable<string> {
    const params =  { id_imagen: id_imagen };
    return this.http.get<string>(`${this.API_URI}/url`, { params: params });
  }

  





}
