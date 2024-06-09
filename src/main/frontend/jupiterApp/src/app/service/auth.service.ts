import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/enviroments.prod";
import {catchError, delay, map, Observable, of, tap} from "rxjs";
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
    let id = this.getToken();
    if (id){
      this.usuarioService.getUsuarioById(id).subscribe(res=>
        this.user.set(res)
      )
    }
  }

  isAuth(): Observable<boolean>{
    if (!this.getToken()) {
      return of(false);
    }
    return this.http.get<Usuario>(`${this.baseUrl()}/usuarios/${this.getToken()}`)
      .pipe(
        tap(user => this.user.set(user)),
        map(user => !!user),
        catchError(()=> of(false))
      );
  }

  isAdmin(): Observable<boolean>{
    if (!this.getToken()) {
      return of(false);
    }
    return this.http.get<Usuario>(`${this.baseUrl()}/usuarios/${this.getToken()}`)
      .pipe(
        tap(user => this.user.set(user)),
        map(user => user.rol =="admin"),
        catchError(()=> of(false))
      );
  }

  private getToken(){
    return  localStorage.getItem('sessionToken');
  }

}
