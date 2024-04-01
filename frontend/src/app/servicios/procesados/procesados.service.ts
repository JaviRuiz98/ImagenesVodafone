import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from "rxjs";

import { procesados_imagenes } from '../../interfaces/procesados_imagenes';
import { UrlService } from '../url/url.service';

 
@Injectable({
  providedIn: 'root'
})

export class ProcesadosService {
  
  constructor(
    private http: HttpClient, 
    private urlService: UrlService
    ){ }
    
    API_URI = this.urlService.api_uri;
  postProcesamientoImagenes(id_elemento:number, id_expositor_selected: number, id_auditoria: number, imageFile: File  ): Observable<procesados_imagenes> {
    const formData = new FormData();
    console.log('datos', id_elemento, id_expositor_selected, id_auditoria, imageFile);
    formData.append('id_elemento', id_elemento.toString());
    formData.append('id_expositor', id_expositor_selected.toString());
    formData.append('id_auditoria', id_auditoria.toString());
    formData.append('imagenesProcesamiento', imageFile);
    return this.http.post<procesados_imagenes>(`${this.API_URI}/procesado`, formData);
  }

  deleteProcesado(procesado: procesados_imagenes){
    return this.http.delete(`${this.API_URI}/borrarProcesado/${procesado.id}`);
  }
 
  updateFeedbackProcesado(id_procesado_imagen: number, feedback: boolean | null): Observable<any> {
    const body = {
      id_procesado_imagen: id_procesado_imagen,
      feedback: feedback !== null ? feedback : null
    };
    return this.http.post<any>(`${this.API_URI}/feedbackProcesado`,body);
  }

  checkImage(url: string): Observable<boolean> {
    return this.http.get(url, { responseType: 'text', observe: 'response' })
      .pipe(
        map(response => {
          // Si el servidor devuelve una respuesta, asumimos que la imagen existe
          return true;
        }),
        catchError(error => {
          // Si hay un error (ej., 404 Not Found), asumimos que la imagen no existe
          return of(false);
        })
      );
  }
  
}
