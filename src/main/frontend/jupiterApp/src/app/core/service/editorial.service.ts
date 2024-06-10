import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Editorial} from "../interface/editorial.interface";
import {environments} from "../../../../environments/enviroments.prod";
import {catchError, map, Observable, of} from "rxjs";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class EditorialService {
  private baseUrl = signal(environments.baseUrl)
  private http = inject(HttpClient);

  constructor(private messageService: MessageService) {
  }

  getEditorial(): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(this.baseUrl() + '/editoriales')
  }

  deleteEditorial(id: number): Observable<Boolean> {
    return this.http.delete(this.baseUrl() + '/editoriales/' + id)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
  }

  addEditorial(editorial: Editorial): Observable<Boolean> {
    return this.http.post<Editorial>(this.baseUrl() + '/editoriales', editorial)
      .pipe(
        map(() => true),
        catchError((err) => {
          for (let i in err.error)
            this.messageService.add({severity: 'info', summary: 'No valido', detail: err.error[i].message});
          return of(false);
        })
      )
  }

  updateEditorial(editorial: Editorial): Observable<Boolean> {
    if (!editorial.id) throw Error('El id es requerido');
    return this.http.put<Editorial>(this.baseUrl() + '/editoriales/' + editorial.id, editorial)
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
