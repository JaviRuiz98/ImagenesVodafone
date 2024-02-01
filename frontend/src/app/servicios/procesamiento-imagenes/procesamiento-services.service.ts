import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

import { procesados_imagenes } from '../../interfaces/procesados_imagenes';

 
@Injectable({
  providedIn: 'root'
})

export class ProcesamientoService {
  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient){ }


  getProcesados(id_auditoria: number): Observable<procesados_imagenes[]> {
    return this.http.get<procesados_imagenes[]>(`${this.API_URI}/procesados/${id_auditoria}`);
  }

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


}
