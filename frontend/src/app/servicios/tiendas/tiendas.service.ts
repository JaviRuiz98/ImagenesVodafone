import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

import { tienda } from '../../interfaces/tienda';  
import { mueble } from '../../interfaces/muebles';
import { expositores } from '../../interfaces/expositor';
import { imagenes } from '../../interfaces/imagenes';
import { filtro_procesados } from 'src/app/interfaces/filtro_procesados';

@Injectable({
  providedIn: 'root'
})

export class TiendasService {

  API_URI = 'http://localhost:3000';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  options = { 
    headers: this.headers
  }


  constructor(private http: HttpClient){ }

  getTienda(sfid: string, filtros?:filtro_procesados): Observable<tienda> {
   
    let body: any = undefined;

    if(filtros){
      body = {
        orden: filtros.orden,
        categoria: filtros.categoria,
        prompts: filtros.prompts,
        careteles: filtros.respuestas_carteles,
        dispositivos: [filtros.rangos_cuentas.min, filtros.rangos_cuentas.max]
      }
    }

    return this.http.post<tienda>(`${this.API_URI}/tiendas/${sfid}`, body, this.options);

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
