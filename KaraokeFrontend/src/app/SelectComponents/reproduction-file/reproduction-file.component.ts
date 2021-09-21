import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CancionesService} from "../../services/canciones.service";
import {Cancion} from "../../Clases/Cancion";
import { ListaCancionesAuxService } from 'src/app/services/lista-canciones-aux.service';
import { PlayerService } from 'src/app/services/player.service';



@Component({
  selector: 'app-reproduction-file',
  templateUrl: './reproduction-file.component.html',
  styleUrls: ['./reproduction-file.component.css']
})
export class ReproductionFileComponent implements OnInit {

  constructor(private router: Router, private service: CancionesService,
    private listaCancionesService: ListaCancionesAuxService, private playerService: PlayerService) { }

  listaDeCacniones: Cancion[] = [];
  cancionActual: Cancion = new Cancion();

  ngOnInit(): void {
    this.listaCancionesService.sharedListaCanciones.subscribe(listaCanciones => this.listaDeCacniones = listaCanciones)

    this.service.obtenerListaCancionesPublicas().subscribe(lista =>
    {this.listaDeCacniones = lista;
      console.log(lista)
    })
  }

  public IrAStrem(item: Cancion): void{
    this.router.navigateByUrl('/stream');
    console.log(item);
    this.playerService.cancion = item;

  }

}
