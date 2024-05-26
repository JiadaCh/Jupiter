import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/enviroments.prod";
import {catchError, map, Observable, of} from "rxjs";
import {Libro} from "@interface/libros.interface";

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private baseUrl = signal(environments.baseUrl)
  private http = inject(HttpClient);
  constructor() {}

  getLibro():Observable<Libro[]>{
    return this.http.get<Libro[]>(this.baseUrl()+'/libros')
  }

  deleteLibro(id:number):Observable<Boolean> {
    return this.http.delete(this.baseUrl()+'/libros/'+id)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }

  addLibro(libro:Libro):Observable<Boolean> {
    return this.http.post<Libro>(this.baseUrl()+'/libros',libro)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }

  updateLibro(libro:Libro):Observable<Boolean> {
    if(!libro.id) throw Error('El id es requerido');
    return this.http.put<Libro>(this.baseUrl()+'/libros/'+libro.id,libro)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }
}
