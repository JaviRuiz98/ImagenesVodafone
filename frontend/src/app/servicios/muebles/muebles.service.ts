import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { muebles } from '../../interfaces/muebles';
import { filtro_procesados } from 'src/app/interfaces/filtro_procesados';
import { muebleCreation } from 'src/app/pages/mueble/interfaces/muebleCreacion';
import { expositores } from 'src/app/interfaces/expositores';

@Injectable({
  providedIn: 'root'
})
export class MueblesService {

  constructor(private http: HttpClient) { }

  modeloCategoriaId = 3;

  API_URI = 'http://localhost:3000/muebles/';
  API_URI_CREATE = 'http://localhost:3000/createMueble';
  API_URI_EXPOSITORES = 'http://localhost:3000/expositores/';

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
}


