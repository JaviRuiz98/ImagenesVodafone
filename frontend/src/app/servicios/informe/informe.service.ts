import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  constructor(
    private urlService: UrlService,
    private http: HttpClient
  ) { }

  enviarInforme(body: { id_auditoria: number }): Observable<any> {
    return this.http.post<any>(`${this.urlService.api_uri}/enviar_informe`, body);
  }

  descargarInforme(body: { id_auditoria: number }): Observable<Blob> {
    return this.http.post<Blob>(`${this.urlService.api_uri}/descargar_informe`, body, {
      responseType: 'blob' as 'json'
    });
  }

  getDatosInforme(id_auditoria: number): Observable<any> {
    return this.http.get<any>(`${this.urlService.api_uri}/datos_informe/${id_auditoria}`);
  }
}
