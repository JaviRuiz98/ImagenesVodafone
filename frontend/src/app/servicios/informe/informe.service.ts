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
}