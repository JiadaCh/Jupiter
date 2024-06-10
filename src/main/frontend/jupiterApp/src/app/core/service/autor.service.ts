import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Autor} from "../interface/autor.interface";
import {environments} from "../../../../environments/enviroments.prod";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private baseUrl = signal(environments.baseUrl)
  private http = inject(HttpClient);
  constructor() {}

  getAutor():Observable<Autor[]>{
    return this.http.get<Autor[]>(this.baseUrl()+'/autores')
  }

  deleteAutor(id:number):Observable<Boolean> {
    return this.http.delete(this.baseUrl()+'/autores/'+id)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }

  addAutor(autor:Autor):Observable<Boolean> {
    return this.http.post<Autor>(this.baseUrl()+'/autores',autor)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }

  updateAutor(autor:Autor):Observable<Boolean> {
    if(!autor.id) throw Error('El id es requerido');
    return this.http.put<Autor>(this.baseUrl()+'/autores/'+autor.id,autor)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }
}
