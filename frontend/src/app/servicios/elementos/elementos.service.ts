import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { elementos } from '../../interfaces/elementos';
import { regiones } from 'src/app/interfaces/regiones';

@Injectable({
  providedIn: 'root'
})
export class ElementosService {

  private API_URI = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }
  
  getElementos(categoria?: number): Observable<elementos[]> {
    let url = `${this.API_URI}/elementos`;
    if (categoria) {
      url+=`?categoria=${categoria}`
    }
    return this.http.get<elementos[]>(url);
  }

  
  guardarElemento(nombre: string, activo: boolean, region: regiones, imageFile: File, categoria: number, ): Observable<elementos> {
    const formData = new FormData();

    formData.append('imagenesReferencia', imageFile);
    formData.append('nombre', nombre);
    formData.append('activo', 'true');
    formData.append('id_region', region.id.toString());
    formData.append('categoria', categoria.toString());

    return this.http.post<elementos>(`${this.API_URI}/elemento`, formData);
  }

  cambiarActivo(id_elemento: number, activo: boolean){
    const body = {
      id_elemento,
      activo
    };
    return this.http.post<elementos>(`${this.API_URI}/elementoActivaDesactiva`, body);
  }


  getAllRegiones(){
    return this.http.get<regiones[]>(`${this.API_URI}/regiones`);
  }


  

}
