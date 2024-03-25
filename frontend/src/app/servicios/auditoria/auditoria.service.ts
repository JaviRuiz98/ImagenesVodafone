import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { auditoria } from '../../interfaces/auditoria';
import { muebles_auditoria } from 'src/app/interfaces/muebles_auditoria';
import { UrlService } from '../url/url.service';
import { estados_auditorias } from 'src/app/pages/estadisticas/interface/estados-auditorias';
import { resultados_ordenados } from 'src/app/interfaces/resultados_ordenados';

@Injectable({
  providedIn: 'root'
})

export class AuditoriaService {


  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  options = { 
    headers: this.headers
  }

  constructor(private http: HttpClient, private urlService: UrlService) { }
  API_URI = this.urlService.api_uri;

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

  //No funciona esta ahora, tengo que cambiar el back
  getMueblesAndExpositoresWithProcesadosByIdAuditoria(id_auditoria: number): Observable<muebles_auditoria[]> {

    return this.http.get<muebles_auditoria[]>(`${this.API_URI}/auditoria_elementos_procesados/${id_auditoria}`);
  }

  terminarAuditoria(id_auditoria: number): Observable<any> {
    const putData = {
      id_auditoria: id_auditoria,
    }
    return this.http.put<any>(`${this.API_URI}/terminar_auditoria`, putData);
  }

  createAuditoriaGlobal(): Observable<any> {
    return this.http.post<any>(`${this.API_URI}/auditoria_global`, {});
  }

  getBarraProgresoAuditoria(id_auditoria_seleccionada: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.API_URI}/barra_progreso_auditoria/${id_auditoria_seleccionada}`);
  }

  getEstadisticasEstadosAuditoria(): Observable<estados_auditorias[]> {
    return this.http.get<estados_auditorias[]>(`${this.API_URI}/estadisticas/estados_auditoria`);
  }

  getEstadisticasResultadosAuditoria(): Observable<resultados_ordenados> {
    return this.http.get<resultados_ordenados>(`${this.API_URI}/estadisticas/resultados_auditoria`);
  }

}