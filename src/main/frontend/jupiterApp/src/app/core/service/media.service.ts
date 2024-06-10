import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../../environments/enviroments.prod";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private baseUrl = signal(environments.baseUrl)
  private http = inject(HttpClient);

  constructor() {
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl() + '/media/upload', formData)
  }

}
