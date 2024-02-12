import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Expositor } from '../../interfaces/expositor';
import { imagenes } from '../../interfaces/imagenes';

@Injectable({
  providedIn: 'root'
})
export class ExpositoresService {

  API_URI = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  
  getExpositores(): Observable<Expositor[]> {
    return this.http.get<Expositor[]>(`${this.API_URI}/expositores`);
  }
}
