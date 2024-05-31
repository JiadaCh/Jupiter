import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Producto} from "@interface/producto.interface";
import {environments} from "../../../environments/enviroments.prod";
import {catchError, map, Observable, of} from "rxjs";
import {Usuario} from "@interface/usuario.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = signal(environments.baseUrl)
  private http = inject(HttpClient);
  constructor() {}

  getProducto():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.baseUrl()+'/productos')
  }
  getProductoByUsuario(id:number):Observable<Producto[]>{
    return this.http.get<Producto[]>(this.baseUrl()+'/productos/usuario?id='+id)
      .pipe(
        catchError(error=> of([]))
      );
  }
  getProductoById(id:string):Observable<Producto|undefined>{
    return this.http.get<Producto>(this.baseUrl()+'/productos/'+id)
      .pipe(
        catchError(error=> of(undefined))
      );
  }

  deleteProducto(id:number):Observable<Boolean> {
    return this.http.delete(this.baseUrl()+'/productos/'+id)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }

  addProducto(producto:Producto,usuario:Usuario):Observable<Boolean> {
    if(!usuario.id) throw Error('El usuario es requerido');
    return this.http.post<Producto>(this.baseUrl()+`/productos?id=${usuario.id}`,producto)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }

  updateProducto(producto:Producto):Observable<Boolean> {
    if(!producto.id) throw Error('El id es requerido');
    return this.http.put<Producto>(this.baseUrl()+'/productos/'+producto.id,producto)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }
}
