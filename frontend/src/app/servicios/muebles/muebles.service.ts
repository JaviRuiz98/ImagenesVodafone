import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { muebles } from '../../interfaces/muebles';
import { filtro_procesados } from 'src/app/interfaces/filtro_procesados';



@Injectable({
  providedIn: 'root'
})
export class MueblesService {

  constructor(private http: HttpClient) { }

  API_URI = 'http://localhost:3000/muebles/';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  
  options = { 
    headers: this.headers
  }

  getMueblesFiltered(filtros?:filtro_procesados): Observable<muebles[]> {
    
    let body: any = undefined;

    if(filtros){
      body = {
        orden: filtros.orden,
        categoria: filtros.categoria,
        prompts: filtros.prompts,
        careteles: filtros.respuestas_carteles,
        dispositivos: [filtros.rangos_cuentas.min, filtros.rangos_cuentas.max],
        id_tienda: filtros.id_tienda
      }
    }
    return this.http.post<muebles[]>(this.API_URI, body, this.options);
  }

  getAllMuebles(): Observable<muebles[]> {
    return this.http.get<muebles[]>(this.API_URI);
  }
}


