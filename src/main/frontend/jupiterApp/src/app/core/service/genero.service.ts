import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Genero} from "../interface/genero.interface";
import {environments} from "../../../../environments/enviroments.prod";
import {catchError, map, Observable, of} from "rxjs";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  private baseUrl = signal(environments.baseUrl)
  private http = inject(HttpClient);

  constructor(private messageService: MessageService) {
  }

  getGenero(): Observable<Genero[]> {
    return this.http.get<Genero[]>(this.baseUrl() + '/generos')
  }

  deleteGenero(id: number): Observable<Boolean> {
    return this.http.delete(this.baseUrl() + '/generos/' + id)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
  }

  addGenero(genero: Genero): Observable<Boolean> {
    return this.http.post<Genero>(this.baseUrl() + '/generos', genero)
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

  updateGenero(genero: Genero): Observable<Boolean> {
    if (!genero.id) throw Error('El id es requerido');
    return this.http.put<Genero>(this.baseUrl() + '/generos/' + genero.id, genero)
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
