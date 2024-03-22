import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { elementos } from '../../interfaces/elementos';
import { regiones } from 'src/app/interfaces/regiones';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class ElementosService {

  
  constructor(private http: HttpClient, private urlService: UrlService) { }

  API_URI = this.urlService.api_uri;

  
  getElementos(categoria?: number): Observable<elementos[]> {
    let url = `${this.API_URI}/elementos`;
    if (categoria) {
      url+=`?categoria=${categoria}`
    }
    return this.http.get<elementos[]>(url);
  }

  getElementosActivos(){
    return this.http.get<elementos[]>(`${this.API_URI}/elementosActivos`);
  }

  guardarElemento(nombre: string,  imageFile: File, categoria: number ): Observable<elementos> {
    const formData = new FormData();

    formData.append('imagenesReferencia', imageFile);
    formData.append('nombre', nombre);
    formData.append('activo', 'true');
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

  getCategorias_elementos(){
    return this.http.get<regiones[]>(`${this.API_URI}/categorias_elementos`);
  }
  
  

}
