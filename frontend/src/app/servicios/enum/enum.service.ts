import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { regiones } from 'src/app/interfaces/regiones';


@Injectable({
  providedIn: 'root'
})
export class EnumService {

private API_URI = 'http://localhost:3000';
  
constructor(private http: HttpClient) { }

getAllRegiones(){
  return this.http.get<regiones[]>(`${this.API_URI}/regiones`);
}

getCategorias_elementos(){
  return this.http.get<regiones[]>(`${this.API_URI}/categorias_elementos`);
}

}
