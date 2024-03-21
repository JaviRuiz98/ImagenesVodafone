import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Prompt } from '../../interfaces/prompts';
import { estadisticaPrompts } from 'src/app/interfaces/estadistica';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class PromptsService {

  
  constructor(private http: HttpClient, private urlService: UrlService){ }
  API_URI = this.urlService.api_uri;

  getAllPrompts(): Observable<Prompt[]> {

    return this.http.get<Prompt[]>(`${this.API_URI}/prompts`);
  }

  
  getEstadisticasPrompts(): Observable<estadisticaPrompts[]> {
    return this.http.get<estadisticaPrompts[]>(`${this.API_URI}/estadisticasPrompts`);
  }

}
