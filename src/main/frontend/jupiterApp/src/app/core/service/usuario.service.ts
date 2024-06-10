import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../interface/usuario.interface";
import {environments} from "../../../../environments/enviroments.prod";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = signal(environments.baseUrl)
  private http = inject(HttpClient);
  constructor() {}

  getUsuario():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.baseUrl()+'/usuarios')
  }

  getUsuarioByProducto(idProducto:number):Observable<Usuario|undefined>{
    return this.http.get<Usuario>(this.baseUrl()+`/usuarios/producto?productoId=${idProducto}`)
      .pipe(
        catchError(error=> of(undefined))
      );
  }

  getUsuarioById(id:string):Observable<Usuario|undefined>{
    return this.http.get<Usuario>(this.baseUrl()+'/usuarios/'+id)
      .pipe(
        catchError(error=> of(undefined))
      );
  }

  deleteUsuario(id:number):Observable<Boolean> {
    return this.http.delete(this.baseUrl()+'/usuarios/'+id)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }

  addUsuario(usuario:Usuario):Observable<Boolean> {
    return this.http.post<Usuario>(this.baseUrl()+'/usuarios',usuario)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }

  updateUsuario(usuario:Usuario):Observable<Boolean> {
    if(!usuario.id) throw Error('El id es requerido');
    return this.http.put<Usuario>(this.baseUrl()+'/usuarios/'+usuario.id,usuario)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }
}
