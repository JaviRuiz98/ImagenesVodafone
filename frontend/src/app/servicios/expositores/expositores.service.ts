import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Expositor } from '../../interfaces/expositor';


@Injectable({
  providedIn: 'root'
})
export class ExpositoresService {

  API_URI = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  
  getExpositores(): Observable<Expositor[]> {
    return this.http.get<Expositor[]>(`${this.API_URI}/expositores`);
  }

  
  guardarExpositor(nombre: string, activo: boolean, imageFile: File  ): Observable<Expositor> {
    const formData = new FormData();

    formData.append('imagenesReferencia', imageFile);
    formData.append('nombre', nombre);
    formData.append('activo', 'true');

    return this.http.post<Expositor>(`${this.API_URI}/expositor`, formData);
  }

  





  
}
