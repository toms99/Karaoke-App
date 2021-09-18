import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cancion} from "../Clases/Cancion";
import {Observable} from "rxjs";
import {User} from "../Clases/user";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CancionesService {
  URL = 'http://localhost:3000/songs'
  constructor(private http: HttpClient, private cookieService: CookieService) {
  }


  public obtenerListaCancionesPublicas(): Observable<Cancion[]>{
    let options = {
      headers: new HttpHeaders().set('Authorization', 'bearer ' + this.cookieService.get("token"))
    };
    return this.http.get<Cancion[]>(this.URL, options);
  }
  public obtenerListaCancionesPrivadas(): Observable<Cancion[]>{
    return this.http.get<Cancion[]>(this.URL, {params: {user: JSON.parse(this.cookieService.get("user")).username} , headers:new HttpHeaders().set('Authorization', 'bearer '
        + this.cookieService.get("token"))});
  }
  public subirUnaCancion(cancion: Cancion):Observable<Object>{
    let options = {
      headers: new HttpHeaders().set('Authorization', 'bearer ' + this.cookieService.get("token"))
    };
    return this.http.post(this.URL, cancion , options);
  }
  public obtenerCancionPorID(id: string){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'bearer ' + this.cookieService.get("token"))
    };
    return this.http.get(this.URL + '/' +id , options);
  }
  public editarCancion(id: string, cancion: Cancion){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'bearer ' + this.cookieService.get("token"))
    };
    return this.http.put(this.URL + '/' + id, cancion , options);
  }
  public eliminarCancion(id: string){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'bearer ' + this.cookieService.get("token"))
    };
    return this.http.delete(this.URL + '/' + id , options);
  }
  public eliminarCancionStorageOnly(id: string){
    return this.http.delete(this.URL + '/' + id,  {params: {storageonly: true} ,
      headers: new HttpHeaders().set('Authorization', 'bearer ' +this.cookieService.get("token"))});
  }

}
