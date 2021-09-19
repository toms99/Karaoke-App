import { Injectable } from '@angular/core';
import {Cancion} from "../Clases/Cancion";

@Injectable({
  providedIn: 'root'
})
export class ListaCancionesAuxService {
  seBuscoAlgo = false
  listaDeCacniones: Cancion[] = [];
  tipoVistaP = false
  constructor() {

  }
  public guardarDatos(lista: Cancion[]): void{
    this.listaDeCacniones = lista;
    this.seBuscoAlgo = true;
  }


}
