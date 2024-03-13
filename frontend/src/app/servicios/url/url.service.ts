import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  //url_en_uso = "http://localhost:3000/";
  url_en_uso = "http://validador-vf.topdigital.local/imagenes/";
  url_imagenes_procesadas = this.url_en_uso + 'imagenesProcesamiento/';
  url_imagenes_referencia = this.url_en_uso + 'imagenesReferencia/';

  api_uri = 'http://localhost:3000';

  constructor() { }

  
}
