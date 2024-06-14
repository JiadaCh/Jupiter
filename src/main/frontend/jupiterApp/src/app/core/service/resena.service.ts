import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Resena} from "../interface/resena.interface";
import {environments} from "../../../../environments/enviroments.prod";
import {catchError, map, Observable, of} from "rxjs";
import {Comic} from "../interface/comic.interface";
import {Libro} from "../interface/libros.interface";
import {Usuario} from "../interface/usuario.interface";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private baseUrl = signal(environments.baseUrl)
  private http = inject(HttpClient);

  constructor(private messageService: MessageService) {
  }

  getResenaComic(comic: Comic): Observable<Resena[]> {
    if (!comic.id) throw Error('El id es requerido');
    return this.http.get<Resena[]>(this.baseUrl() + `/resenas/comics?id=${comic.id}`)
  }

  getResenaLibro(libro: Libro): Observable<Resena[]> {
    return this.http.get<Resena[]>(this.baseUrl() + `/resenas/libros?id=${libro.id}`)
  }

  getResenaLibroUsuario(libro: Libro, usuario: Usuario): Observable<Resena> {
    return this.http.get<Resena>(this.baseUrl() + `/resenas/libros/${libro.id}/usuarios?id=${usuario.id}`)
  }

  getResenaComicUsuario(comic: Comic, usuario: Usuario): Observable<Resena> {
    return this.http.get<Resena>(this.baseUrl() + `/resenas/comics/${comic.id}/usuarios?id=${usuario.id}`)
  }

  deleteResena(id: number): Observable<Boolean> {
    return this.http.delete(this.baseUrl() + '/resenas/' + id)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
  }

  addResena(resena: Resena, idComic: number, idLibro: number): Observable<Boolean> {
    return this.http.post<Resena>(this.baseUrl() + `/resenas?idComic=${idComic}&idLibro=${idLibro}`, resena)
      .pipe(
        map(() => true),
        catchError((err) => {
          if (!err.error.message)
            for (let i in err.error)
              this.messageService.add({severity: 'info', summary: 'No valido', detail: err.error[i].message});
          return of(false);
        })
      )
  }

  updateResena(resena: Resena): Observable<Boolean> {
    if (!resena.id) throw Error('El id es requerido');
    return this.http.put<Resena>(this.baseUrl() + '/resenas/' + resena.id, resena)
      .pipe(
        map(() => true),
        catchError((err) => {
          if (!err.error.message)
            for (let i in err.error)
              this.messageService.add({severity: 'info', summary: 'No valido', detail: err.error[i].message});
          return of(false);
        })
      )
  }
}
