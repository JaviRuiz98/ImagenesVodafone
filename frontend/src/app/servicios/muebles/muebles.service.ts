import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { muebles } from '../../interfaces/muebles';
import { filtro_procesados } from 'src/app/interfaces/filtro_procesados';
import { MuebleCreacion } from 'src/app/pages/mueble/interfaces/muebleCreacion';
import { expositores } from 'src/app/interfaces/expositores';

@Injectable({
  providedIn: 'root'
})
export class MueblesService {

  constructor(private http: HttpClient) { }

  API_URI = 'http://localhost:3000/muebles/';
  API_URI_EXPOSITORES = 'http://localhost:3000/expositores/';

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

  getMueblesAuditoria(id_auditoria:number): Observable<muebles[]> {
    return this.http.get<muebles[]>(this.API_URI + 'muebles_auditoria/' + id_auditoria);
  }

  getAllMuebles(): Observable<muebles[]> {
    return this.http.get<muebles[]>(this.API_URI);
  }

  getMueblesTiendaByIdTienda(id_tienda: number): Observable<muebles[]> {
    return this.http.get<muebles[]>(this.API_URI+id_tienda);
  }

  createMueble(mueble: MuebleCreacion): Observable<muebles> {
    return this.http.post<muebles>(this.API_URI, mueble, this.options);
  }

  updateMueble(mueble: muebles): Observable<muebles> {
    return this.http.put<muebles>(this.API_URI + mueble.id, mueble, this.options);
  }

  updateExpositor(expositor: expositores): Observable<expositores> {
    const data = {
      nombre: expositor.nombre,
      atributos_expositores: expositor.atributos_expositores
    }
    return this.http.put<expositores>(this.API_URI_EXPOSITORES  + expositor.id, data, this.options);
  }
}


