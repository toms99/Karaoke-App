import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cancion} from "../Clases/Cancion";
import {Observable} from "rxjs";
import {User} from "../Clases/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL = 'http://localhost:3000/users'
  constructor(private http: HttpClient) { }

  public hacerLogin(user: User):Observable<Object>{
    return this.http.post(this.URL + "/login", user);
  }

  public registraUsuario(user: User):Observable<Object>{
    return this.http.post(this.URL , user);
  }
}
