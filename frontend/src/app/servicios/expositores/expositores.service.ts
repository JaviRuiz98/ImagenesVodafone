import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Expositor } from '../../interfaces/expositor';
import { regiones } from 'src/app/interfaces/regiones';
import { pertenencia_expositor_mueble } from 'src/app/interfaces/pertenencia_expositor_mueble';

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

  
  guardarExpositor(nombre: string, activo: boolean, region: regiones, imageFile: File, categoria: string,  n_dispositivos?: number ): Observable<Expositor> {
    const formData = new FormData();

    formData.append('imagenesReferencia', imageFile);
    formData.append('nombre', nombre);
    formData.append('activo', 'true');
    formData.append('id_region', region.id.toString());
    formData.append('categoria', categoria);
    if(n_dispositivos!=undefined){
      formData.append('numero_dispositivos', n_dispositivos.toString());
    }

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
    return this.http.get<regiones[]>(`${this.API_URI}/regiones`);
  }

  getPertenenciaExpositoMueblebyIdMueble(id_mueble: number): Observable<pertenencia_expositor_mueble[]> {
    return this.http.get<pertenencia_expositor_mueble[]>(`${this.API_URI}/expositores/${id_mueble}`);
  } 

 
  

}
