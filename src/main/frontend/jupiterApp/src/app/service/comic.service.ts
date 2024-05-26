import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/enviroments.prod";
import {catchError, map, Observable, of} from "rxjs";
import {Comic} from "@interface/comic.interface";

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  private baseUrl = signal(environments.baseUrl)
  private http = inject(HttpClient);
  constructor() {}

  getComic():Observable<Comic[]>{
    return this.http.get<Comic[]>(this.baseUrl()+'/comics')
  }

  deleteComic(id:number):Observable<Boolean> {
    return this.http.delete(this.baseUrl()+'/comics/'+id)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }

  addComic(comic:Comic):Observable<Boolean> {
    console.log(comic)
    return this.http.post<Comic>(this.baseUrl()+'/comics',comic)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }

  updateComic(comic:Comic):Observable<Boolean> {
    if(!comic.id && comic.id< 0) throw Error('El id es requerido');

    return this.http.put<Comic>(this.baseUrl()+'/comics/'+comic.id,comic)
      .pipe(
        map(()=> true),
        catchError(() => of(false))
      )
  }
}
