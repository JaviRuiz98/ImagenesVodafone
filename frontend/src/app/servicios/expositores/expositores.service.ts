import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Expositor } from '../../interfaces/expositor';


@Injectable({
  providedIn: 'root'
})
export class ExpositoresService {

  private API_URI = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }
  
  getExpositores(categoria?: string): Observable<Expositor[]> {
    let url = `${this.API_URI}/expositores`
    if (categoria) {
      url+=`?categoria=${categoria}`
    }
    return this.http.get<Expositor[]>(url);
  }

  
  guardarExpositor(nombre: string, activo: boolean, imageFile: File  ): Observable<Expositor> {
    const formData = new FormData();

    formData.append('imagenesReferencia', imageFile);
    formData.append('nombre', nombre);
    formData.append('activo', 'true');

    return this.http.post<Expositor>(`${this.API_URI}/expositor`, formData);
  }

  cambiarActivo(id_expositor: number, activo: boolean){
    const body = {
      id_expositor,
      activo
    };
    return this.http.post<Expositor>(`${this.API_URI}/expositorActivaDesactiva`, body);
  }


  getAllRegiones(){
    return this.http.get<string[]>(`${this.API_URI}/regiones`);
  }

 
  

}
