import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { productos } from '../../interfaces/productos';
import { caracteristicas_productos } from 'src/app/interfaces/caracteristicas'; 

@Injectable({
  providedIn: 'root'
})
export class UniformesService {



  private API_URI = 'http://localhost:3000';
  




  constructor(private http: HttpClient) { }

  getProductos(): Observable<productos[]> {
    return this.http.get<productos[]>(`${this.API_URI}/productos`);
  }

  getCaracteristicas(): Observable<caracteristicas_productos[]> {
    return this.http.get<caracteristicas_productos[]>(`${this.API_URI}/caracteristicas`);
  }

  tramitarPedido(productos_carrito: productos[], id_tienda: number ):Observable<any>{
    return this.http.post(`${this.API_URI}/tramitar-pedido`, {productos_carrito, id_tienda});
  }


}