import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/enviroments.prod";
import {catchError, map, Observable, of, tap} from "rxjs";
import {Usuario} from "@interface/usuario.interface";
import {UsuarioService} from "@service/usuario.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = signal(environments.baseUrl)
  private http = inject(HttpClient);
  private usuarioService = inject(UsuarioService);
  user = signal<Usuario|undefined>(undefined);
  constructor() {}

  login(usuario:string,contra:string):Observable<Usuario>{
    return this.http.get<Usuario>(this.baseUrl()+`/usuarios/login?usuario=${usuario}&contrasena=${contra}`);
  }


  register(usuario:Usuario):Observable<Boolean> {
    return this.http.post<Usuario>(this.baseUrl()+'/usuarios',usuario)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }

  saveToLocalStorage(usuario:Usuario):void {
    this.user.set(usuario);
    localStorage.setItem('sessionToken', String(usuario.id));
  }

  logout():void {
    this.user.set(undefined);
    localStorage.removeItem('sessionToken');
  }

   loadLocalStorage(){
    if( !localStorage.getItem('sessionToken') ) return;
    let id = localStorage.getItem('sessionToken');
    if (id){
      this.usuarioService.getUsuarioById(id).subscribe(res=>
        this.user.set(res)
      )
    }
  }

  isAuth(): Observable<boolean>{
    if(!localStorage.getItem('sessionToken')) return of(false);

    const token =localStorage.getItem('sessionToken');

    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/`+token)
      .pipe(
        tap(user => this.user.set(user)),
        map(user => !!user),
        catchError(err=> of(false))
      );
  }


}
