import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { productos } from '../../interfaces/productos';
import { Opciones_caracteristicas } from 'src/app/interfaces/caracteristicas';


@Injectable({
  providedIn: 'root'
})
export class UniformesService {



  private API_URI = 'http://localhost:3000';
  




  constructor(private http: HttpClient) { }



  getProductos(): Observable<productos[]> {
    return this.http.get<productos[]>(`${this.API_URI}/productos`);
  }

  getCaracteristicas(): Observable<Opciones_caracteristicas[]> {
    return this.http.get<Opciones_caracteristicas[]>(`${this.API_URI}/caracteristicas`);
  }

  


}
