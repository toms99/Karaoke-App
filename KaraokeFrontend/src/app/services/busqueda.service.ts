import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {Cancion} from "../Clases/Cancion";
import {query} from "@angular/animations";
import {Busqueda} from "../Clases/busqueda";

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  URL = 'http://localhost:3000/songs'

  public busqueda(busqueda: Busqueda): Observable<Cancion[]> {
    // @ts-ignore
    return this.http.get<Cancion[]>(this.URL, {params: busqueda,
      headers: new HttpHeaders().set('Authorization', 'bearer ' + this.cookieService.get("token"))});
  }
}
