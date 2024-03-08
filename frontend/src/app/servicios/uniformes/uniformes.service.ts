import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { productos } from '../../interfaces/productos';



@Injectable({
  providedIn: 'root'
})
export class UniformesService {



  private API_URI = 'http://localhost:3000';
  




  constructor(private http: HttpClient) { }



  getProductos(): Observable<productos[]> {
    return this.http.get<productos[]>(`${this.API_URI}/productos`);
  }

  


}
