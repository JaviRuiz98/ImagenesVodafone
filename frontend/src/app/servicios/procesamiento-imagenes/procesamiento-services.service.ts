import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

import { procesados_imagenes } from '../../interfaces/procesados_imagenes';
import { respuesta_carteles } from '../../interfaces/respuesta_carteles';
import { respuesta_dispositivos } from '../../interfaces/respuesta_dispositivos';
 
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

}
