import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Prompt } from '../../interfaces/prompts';
import { estadisticaPrompts } from 'src/app/interfaces/estadistica';

@Injectable({
  providedIn: 'root'
})
export class PromptsService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient){ }

  getAllPrompts(): Observable<Prompt[]> {

    return this.http.get<Prompt[]>(`${this.API_URI}/prompts`);
  }

  
  getEstadisticasPrompts(): Observable<estadisticaPrompts[]> {
    return this.http.get<estadisticaPrompts[]>(`${this.API_URI}/estadisticasPrompts`);
  }

}
