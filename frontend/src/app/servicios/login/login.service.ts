import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { credenciales } from '../../interfaces/login';
import { nuevoUsuario } from '../../interfaces/login';
import { Observable } from 'rxjs';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  
  constructor(private http: HttpClient, private urlService: UrlService) { }
  API_URI_LOGIN = this.urlService.api_uri + '/usuarios';

  verificarUsuario(credenciales: credenciales): Observable<string>{
    return this.http.post<string>(this.API_URI_LOGIN, credenciales);
  }

  crearUsuario(parametros: nuevoUsuario): Observable<string>{
    return this.http.post<string>(this.API_URI_LOGIN+'nuevoUsuario', parametros);
  }
}
