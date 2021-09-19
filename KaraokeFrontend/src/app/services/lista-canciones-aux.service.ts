import { Injectable } from '@angular/core';
import {Cancion} from "../Clases/Cancion";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaCancionesAuxService {
  private listaCanciones = new BehaviorSubject([new Cancion()]);
  sharedListaCanciones = this.listaCanciones.asObservable();

  constructor() { }

  nextListaDeCanciones(listaCanciones: Cancion[]) {
    this.listaCanciones.next(listaCanciones)
  }
}
