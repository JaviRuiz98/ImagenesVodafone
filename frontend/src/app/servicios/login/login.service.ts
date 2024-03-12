import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { credenciales } from '../../interfaces/login';
import { nuevoUsuario } from '../../interfaces/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  API_URI_LOGIN = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  verificarUsuario(credenciales: credenciales): Observable<string>{
    return this.http.post<string>(this.API_URI_LOGIN+'usuarios', credenciales);
  }

  crearUsuario(parametros: nuevoUsuario): Observable<string>{
    return this.http.post<string>(this.API_URI_LOGIN+'nuevoUsuario', parametros);
  }
}
