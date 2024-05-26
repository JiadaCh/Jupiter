import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pedido} from "@interface/pedido.interface";
import {environments} from "../../../environments/enviroments.prod";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl = signal(environments.baseUrl)
  private http = inject(HttpClient);
  constructor() {}

  getPedido():Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.baseUrl()+'/pedidos')
  }

  deletePedido(id:number):Observable<Boolean> {
    return this.http.delete(this.baseUrl()+'/pedidos/'+id)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }

  addPedido(pedido:Pedido):Observable<Boolean> {
    return this.http.post<Pedido>(this.baseUrl()+'/pedidos',pedido)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }

  updatePedido(pedido:Pedido):Observable<Boolean> {
    if(!pedido.id) throw Error('El id es requerido');
    return this.http.put<Pedido>(this.baseUrl()+'/pedidos/'+pedido.id,pedido)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }
}
