import { Injectable } from '@angular/core';
import { Cancion } from '../Clases/Cancion';



@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  public letra: {words:string, second:number}[] = []
  public fileName: string = ''

  public cancion: Cancion= new Cancion();

}
