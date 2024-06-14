import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../../environments/enviroments.prod";
import {catchError, map, Observable, of} from "rxjs";
import {Comic, ComicPag} from "../interface/comic.interface";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  private baseUrl = signal(environments.baseUrl)
  private http = inject(HttpClient);

  constructor(private messageService: MessageService) {
  }

  getComic(): Observable<Comic[]> {
    return this.http.get<Comic[]>(this.baseUrl() + '/comics')
  }

  getComicPag(pag: number, top: number): Observable<ComicPag> {
    return this.http.get<ComicPag>(this.baseUrl() + `/comics?pag=${pag}&top=${top}`)
  }

  getComicById(id: string): Observable<Comic | undefined> {
    return this.http.get<Comic>(this.baseUrl() + '/comics/' + id)
      .pipe(
        catchError(() => of(undefined))
      );
  }

  deleteComic(id: number): Observable<Boolean> {
    return this.http.delete(this.baseUrl() + `/comics/${id}`)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
  }

  addComic(comic: Comic): Observable<Boolean> {
    return this.http.post<Comic>(this.baseUrl() + '/comics', comic)
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

  updateComic(comic: Comic): Observable<Boolean> {
    if (!comic.id && comic.id < 0) throw Error('El id es requerido');

    return this.http.put<Comic>(this.baseUrl() + '/comics/' + comic.id, comic)
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
