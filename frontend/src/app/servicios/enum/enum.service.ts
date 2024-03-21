import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { regiones } from 'src/app/interfaces/regiones';
import { UrlService } from '../url/url.service';


@Injectable({
  providedIn: 'root'
})
export class EnumService {

  
  constructor(private http: HttpClient, private urlService: UrlService) { }
  
  API_URI = this.urlService.api_uri;

  getAllRegiones(){
    return this.http.get<regiones[]>(`${this.API_URI}/regiones`);
  }

  getCategorias_elementos(){
    return this.http.get<regiones[]>(`${this.API_URI}/categorias_elementos`);
  }

}
