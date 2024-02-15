import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

import { procesados_imagenes } from '../../interfaces/procesados_imagenes';
import { muebles } from 'src/app/interfaces/muebles';
import { PublicMethodsService } from 'src/app/shared/public-methods.service';

 
@Injectable({
  providedIn: 'root'
})

export class ProcesamientoService {
  API_URI = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ){ }

  postProcesamientoImagenes(id_expositor:number, id_mueble_selected: number, id_auditoria: number, imageFile: File  ): Observable<procesados_imagenes> {
    const formData = new FormData();
    console.log('datos', id_expositor, id_mueble_selected, id_auditoria, imageFile);
    formData.append('id_expositor', id_expositor.toString());
    formData.append('id_mueble', id_mueble_selected.toString());
    formData.append('id_auditoria', id_auditoria.toString());
    formData.append('imagenesProcesamiento', imageFile);

    console.log("formData", formData);

    return this.http.post<procesados_imagenes>(`${this.API_URI}/procesado`, formData);
  }

  deleteProcesado(procesado: procesados_imagenes){
    return this.http.delete(`${this.API_URI}/borrarProcesado/${procesado.id_procesado_imagen}`);
  }
 

  updateFeedbackProcesado(id_procesado_imagen: number, feedback: boolean | null): Observable<any> {
    const body = {
      id_procesado_imagen,
      feedback: feedback !== null ? feedback : null
    };
  
    return this.http.post<any>(`${this.API_URI}/feedbackProcesado`,body);
  }

  
}
