import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

import { procesados_imagenes } from '../../interfaces/procesados_imagenes';
import { estadisticaPrompts } from 'src/app/interfaces/estadistica';
 
@Injectable({
  providedIn: 'root'
})

export class ProcesamientoService {
  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient){ }

  postProcesamientoImagenes(id_expositor:number,imageFile: File  ): Observable<procesados_imagenes> {
    const formData = new FormData();
    formData.append('idExpositor', id_expositor.toString());
    formData.append('imagenesProcesamiento', imageFile);

    return this.http.post<procesados_imagenes>(`${this.API_URI}/procesamiento`, formData);
  }

  deleteProcesado(procesado: procesados_imagenes){
    return this.http.delete(`${this.API_URI}/borrarProcesamiento/${procesado.id_procesado_imagen}`);
  }
 

  updateFeedbackProcesado(id_procesado_imagen: number, feedback: boolean | null): Observable<any> {
    const body = {
      id_procesado_imagen,
      feedback: feedback !== null ? feedback : null
    };
  
    return this.http.post<any>(`${this.API_URI}/feedbackProcesado`,body);
  }

  getEstadisticas(): Observable<estadisticaPrompts[]> {
    return this.http.get<estadisticaPrompts[]>(`${this.API_URI}/estadisticasPrompts`);
  }

}
