import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Cancion} from "../Clases/Cancion";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CancionesService {
  URL = 'http://localhost:3000/songs'
  constructor(private http: HttpClient) {

  }
  public obtenerListaCancionesPublicas(): Observable<Cancion[]>{
    return this.http.get<Cancion[]>(this.URL);
  }
  public obtenerListaCancionesPrivadas(user: string): Observable<Cancion[]>{
    return this.http.get<Cancion[]>(this.URL, {params: {user}});
  }
  public subirUnaCancion(cancion: Cancion):Observable<Object>{
    return this.http.post(this.URL, cancion);
  }
  public obtenerCancionPorID(id: string){
    return this.http.get(this.URL + '/' +id);
  }
  public editarCancion(id: string, cancion: Cancion){
    return this.http.put(this.URL + '/' + id, cancion);
  }
  public eliminarCancion(id: string){
    return this.http.delete(this.URL + '/' + id);
  }
  public eliminarCancionStorageOnly(id: string){
    return this.http.delete(this.URL + '/' + id,  {params: {storageonly: true}});
  }

}
