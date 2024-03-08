import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { credenciales } from '../../interfaces/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  API_URI_LOGIN = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  verificarUsuario(credenciales: credenciales): Observable<boolean>{
    return this.http.post<boolean>(this.API_URI_LOGIN, credenciales);
  }
}
