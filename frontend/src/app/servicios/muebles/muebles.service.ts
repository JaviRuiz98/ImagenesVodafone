import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { muebles } from '../../interfaces/muebles';
import { filtro_procesados } from 'src/app/interfaces/filtro_procesados';
import { muebleCreation } from 'src/app/pages/mueble/interfaces/muebleCreacion';
import { expositores } from 'src/app/interfaces/expositores';
import { pertenencia_elementos_atributos } from 'src/app/interfaces/pertenencia_elementos_atributos';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class MueblesService {

  constructor(private http: HttpClient, private urlService: UrlService) { }

  modeloCategoriaId = 3;

  API_URI = this.urlService.api_uri + '/muebles/';
  API_URI_CREATE = this.urlService.api_uri + '/createMueble';
  API_URI_EXPOSITORES = this.urlService.api_uri + '/expositores/';
  API_URI_MUEBLE = this.urlService.api_uri + '/mueble/'

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  headersMultiForm = new HttpHeaders({
    'Content-Type': 'multipart/form-data',
  });

  options = { 
    headers: this.headers
  }

  getMueblesFiltered(filtros?:filtro_procesados): Observable<muebles[]> {
    let body: any = undefined;
    if(filtros){
      body = {
        orden: filtros.orden,
        categoria: filtros.categoria,
        prompts: filtros.prompts,
        careteles: filtros.respuestas_carteles,
        dispositivos: [filtros.rangos_cuentas.min, filtros.rangos_cuentas.max],
        id_tienda: filtros.id_tienda
      }
    }    
    return this.http.post<muebles[]>(this.API_URI, body, this.options);
  }

  getMueblesAuditoria(id_auditoria:number): Observable<muebles[]> {
    return this.http.get<muebles[]>(this.API_URI + 'muebles_auditoria/' + id_auditoria);
  }

  getAllMuebles(): Observable<muebles[]> {
    return this.http.get<muebles[]>(this.API_URI);
  }

  getMueblesTiendaByIdTienda(id_tienda: number): Observable<muebles[]> {
    return this.http.get<muebles[]>(this.API_URI+id_tienda);
  }

  createMueble(mueble: muebleCreation): Observable<muebles> {
    const formData = new FormData();

    for (const expositor of mueble.expositores) {
      for (const atributo of expositor.atributos_expositores) {
          if (atributo.categorias_elementos?.id != null && atributo.categorias_elementos.id == this.modeloCategoriaId && atributo.elemento?.archivos_imagenes != undefined) {
            console.log("introducido");
            formData.append('imagenesReferencia', atributo.elemento.archivos_imagenes);

            //insertar nombre de archivo en MUEBLE
            const indexExpositor = mueble.expositores.indexOf(expositor);
            const indexAtributo = expositor.atributos_expositores.indexOf(atributo);
            mueble.expositores[indexExpositor].atributos_expositores[indexAtributo].elemento.nombre_archivo = atributo.elemento.archivos_imagenes.name;
            console.log (mueble.expositores[indexExpositor].atributos_expositores[indexAtributo].elemento);
            
          } 
      }
    }
    console.log ("mueble guardado", mueble);  
    formData.append('muebleData', JSON.stringify(mueble));
    return this.http.post<muebles>(this.API_URI_CREATE, formData);
  }

  updateMueble(mueble: muebles): Observable<muebles> {
    return this.http.put<muebles>(this.API_URI + mueble.id, mueble, this.options);
  }

  updateExpositor(expositor: expositores): Observable<expositores> {
    const data = {
      nombre: expositor.nombre,
      atributos_expositores: expositor.atributos_expositores
    }
    return this.http.put<expositores>(this.API_URI_EXPOSITORES  + expositor.id, data, this.options);
  }
  getPertenenciaExpositorElementobyIdExpositor(id_expositor: number): Observable<pertenencia_elementos_atributos[]> {
    //no funciona todavia
    return this.http.get<pertenencia_elementos_atributos[]>(this.API_URI + 'pertenencia_elementos_atributos/' + id_expositor);
  }

  desactivarMueble(id_mueble: number): Observable<muebles> {
    console.log (id_mueble)
    return this.http.put<muebles>(this.API_URI_MUEBLE + id_mueble, this.options);
  }

}


