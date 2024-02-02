import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { auditoria } from '../../interfaces/auditoria';
import { procesados_imagenes } from '../../interfaces/procesados_imagenes';




@Injectable({
  providedIn: 'root'
})


export class AuditoriaService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  getAuditorias(id_tienda: number): Observable<auditoria[]> {
    return this.http.get<auditoria[]>(`${this.API_URI}/auditoria/${id_tienda}`);
  }

  






  
}
