import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { auditoria } from '../../interfaces/auditoria';
import { procesados_imagenes } from '../../interfaces/procesados_imagenes';
import { BaseRouteReuseStrategy } from '@angular/router';
import { muebles } from 'src/app/interfaces/muebles';
import { muebles_auditoria } from 'src/app/interfaces/muebles_auditoria';

@Injectable({
  providedIn: 'root'
})

export class AuditoriaService {

  API_URI = 'http://localhost:3000';

  id_auditoria_seleccionada: number = 0;
  auditoria_seleccionada: auditoria = new auditoria(null);

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

  getAuditoriaById(id_auditoria: number): Observable<auditoria> {
    return this.http.get<auditoria>(`${this.API_URI}/auditoria_by_id/${id_auditoria}`);
  }

  getAuditorias(id_tienda: number): Observable<auditoria[]> {
    return this.http.get<auditoria[]>(`${this.API_URI}/auditorias/${id_tienda}`);
  }

  getMueblesAndExpositoresWithProcesadosByIdAuditoria(id_auditoria: number): Observable<muebles_auditoria[]> {
    return this.http.get<muebles_auditoria[]>(`${this.API_URI}/muebles_auditoria/${id_auditoria}`);
  }

  terminarAuditoria(id_auditoria: number): Observable<any> {
    const putData = {
      id_auditoria: id_auditoria
    }
    return this.http.put<any>(`${this.API_URI}/terminar_auditoria`, putData);
  }

  createAuditoriaGlobal(): Observable<any> {
    return this.http.post<any>(`${this.API_URI}/auditoria_global`, {});
  }

  getBarraProgresoAuditoria(id_auditoria_seleccionada: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.API_URI}/barra_progreso_auditoria/${id_auditoria_seleccionada}`);
  }
}