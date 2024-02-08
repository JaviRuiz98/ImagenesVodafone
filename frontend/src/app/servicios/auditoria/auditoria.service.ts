import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { auditoria } from '../../interfaces/auditoria';
import { procesados_imagenes } from '../../interfaces/procesados_imagenes';
import { BaseRouteReuseStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuditoriaService {

  API_URI = 'http://localhost:3000';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  options = { 
    headers: this.headers
  }

  constructor(private http: HttpClient) { }

  nuevaAuditoria(id_tienda: number): Observable<any> {
    const body_data = {
      id_tienda: id_tienda
    }
    return this.http.post<any>(`${this.API_URI}/nueva_auditoria`,body_data, this.options);
  }

  getAuditorias(id_tienda: number): Observable<auditoria[]> {
    const params =  { id_tienda: id_tienda };
    return this.http.get<auditoria[]>(`${this.API_URI}/auditorias/${id_tienda}`);
  }
}