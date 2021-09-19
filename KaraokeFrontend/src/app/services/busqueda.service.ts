import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {Cancion} from "../Clases/Cancion";
import {query} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  URL = 'http://localhost:3000/songs'

  public busquedaPorTipo(): Observable<Cancion[]> {
    let options: { headers: HttpHeaders;};
    options = {
      headers: new HttpHeaders().set('Authorization', 'bearer ' + this.cookieService.get("token"))
    };
    return this.http.get<Cancion[]>(this.URL, options);
  }
}
