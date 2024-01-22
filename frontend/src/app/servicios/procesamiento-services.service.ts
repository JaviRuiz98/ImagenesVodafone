import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";


import { procesados_imagenes } from '../interfaces/procesados_imagenes';
import { respuesta_carteles } from '../interfaces/respuesta_carteles';
import { respuesta_dispositivos } from '../interfaces/respuesta_dispositivos';
 


@Injectable({
  providedIn: 'root'
})






export class ProcesamientoServicesService {

 


  API_URI = 'http://localhost:3000';


  constructor(private http: HttpClient){ }


  getRespuestasCarteles(id_tienda: number): Observable<respuesta_carteles[]> {
    const params =  { id_tienda: id_tienda };
    return this.http.get<respuesta_carteles[]>(`${this.API_URI}/respuestasCarteles`, { params: params });
  }

  getRespuestasMoviles(id_tienda: number): Observable<respuesta_dispositivos[]> {
    const params =  { id_tienda: id_tienda };
    return this.http.get<respuesta_dispositivos[]>(`${this.API_URI}/respuestasMoviles`, { params: params });
  }


  

  postProcesamientoImagenes(procesado: procesados_imagenes): Observable<procesados_imagenes> {

    return this.http.post<procesados_imagenes>(`${this.API_URI}/procesamientoImagenes`, procesado);

  }







}
