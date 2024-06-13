import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../../environments/enviroments.prod";
import {catchError, map, Observable, of} from "rxjs";
import {Libro, LibroPag} from "../interface/libros.interface";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private baseUrl = signal(environments.baseUrl)
  private http = inject(HttpClient);

  constructor(private messageService: MessageService) {
  }

  getLibro(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.baseUrl() + '/libros')
  }

  getLibroPag(pag:number, top:number): Observable<LibroPag> {
    return this.http.get<LibroPag>(this.baseUrl() + `/libros?pag=${pag}&top=${top}`)
  }

  getLibroById(id: string): Observable<Libro | undefined> {
    return this.http.get<Libro>(this.baseUrl() + '/libros/' + id)
      .pipe(
        catchError(() => of(undefined))
      );
  }

  deleteLibro(id: number): Observable<Boolean> {
    return this.http.delete(this.baseUrl() + '/libros/' + id)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
  }

  addLibro(libro: Libro): Observable<Boolean> {
    return this.http.post<Libro>(this.baseUrl() + '/libros', libro)
      .pipe(
        map(() => true),
        catchError((err) => {
          for (let i in err.error)
            this.messageService.add({severity: 'info', summary: 'No valido', detail: err.error[i].message});
          return of(false);
        })
      )
  }

  updateLibro(libro: Libro): Observable<Boolean> {
    if (!libro.id) throw Error('El id es requerido');
    return this.http.put<Libro>(this.baseUrl() + '/libros/' + libro.id, libro)
      .pipe(
        map(() => true),
        catchError((err) => {
          for (let i in err.error)
            this.messageService.add({severity: 'info', summary: 'No valido', detail: err.error[i].message});
          return of(false);
        })
      )
  }
}
