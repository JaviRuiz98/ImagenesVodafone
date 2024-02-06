import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { auditoria } from '../../interfaces/auditoria';
import { procesados_imagenes } from '../../interfaces/procesados_imagenes';

@Injectable({
  providedIn: 'root'
})

export class AuditoriaService {

  API_URI = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  nuevaAuditoria(id_tienda: number, id_mobiliario: number): Observable<procesados_imagenes> {
    const params =  { id_tienda: id_tienda, id_mobiliario: id_mobiliario };
    return this.http.get<procesados_imagenes>(`${this.API_URI}/nuevaAuditoria`, { params: params });
  }

  getAuditorias(id_tienda: number): Observable<auditoria[]> {
    const params =  { id_tienda: id_tienda };
    return this.http.get<auditoria[]>(`${this.API_URI}/auditorias/${id_tienda}`);
  }
}