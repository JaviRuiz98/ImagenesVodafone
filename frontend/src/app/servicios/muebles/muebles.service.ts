import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { muebles } from '../../interfaces/muebles';
import { filtro_procesados } from 'src/app/interfaces/filtro_procesados';
import { imagenes } from '../../interfaces/imagenes';


@Injectable({
  providedIn: 'root'
})
export class MueblesService {

  constructor(private http: HttpClient) { }

  API_URI = 'http://localhost:3000/';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  
  options = { 
    headers: this.headers
  }


  getMuebles(filtros?:filtro_procesados): Observable<muebles[]> {

    let body: any = undefined;
    let url = `${this.API_URI}muebles`;    
    
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
  
    
  
    return this.http.post<muebles[]>(url, body, this.options);
  }

}


