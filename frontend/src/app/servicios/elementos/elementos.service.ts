import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { elementos } from '../../interfaces/elementos';
import { regiones } from 'src/app/interfaces/regiones';
import { UrlService } from '../url/url.service';
import { estadisticas_carteles, estadisticas_conteo_dispositivos, resultados_ordenados, resultados_ordenados_elementos } from 'src/app/interfaces/resultados_ordenados';

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

  getEstadisticasRespuestas(): Observable<resultados_ordenados_elementos>{
    return this.http.get<resultados_ordenados_elementos>(`${this.API_URI}/estadisticas/elementos`);
  }

  getEstadisticasCarteles(): Observable<estadisticas_carteles[]>{
    return this.http.get<estadisticas_carteles[]>(`${this.API_URI}/estadisticas/carteles`);
  }
  getEstadisticasConteoDispositivos(): Observable<estadisticas_conteo_dispositivos[]>{
    return this.http.get<estadisticas_conteo_dispositivos[]>(`${this.API_URI}/estadisticas/dispositivos`);
  }

  getElementoWithProcesadosById(id_elemento: number): Observable<elementos> {
    return this.http.get<elementos>(`${this.API_URI}/elementos/procesados/${id_elemento}`);
  }

  getEstadisticasRespuestasById(id_elemento: number): Observable<resultados_ordenados>{
    return this.http.get<resultados_ordenados>(`${this.API_URI}/estadisticas/elementos/${id_elemento}`);
  }

  getNumProcesadosByCategoria(): Observable<{conteo_dispositivos: number, carteles: number}> {
    return this.http.get<{conteo_dispositivos: number, carteles: number}>(`${this.API_URI}/estadisticas/categorias`);
  }
  
  

}
