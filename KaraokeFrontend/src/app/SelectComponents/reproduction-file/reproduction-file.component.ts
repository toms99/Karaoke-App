import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CancionesService} from "../../services/canciones.service";
import {Cancion} from "../../Clases/Cancion";



@Component({
  selector: 'app-reproduction-file',
  templateUrl: './reproduction-file.component.html',
  styleUrls: ['./reproduction-file.component.css']
})
export class ReproductionFileComponent implements OnInit {

  constructor(private router: Router, private service: CancionesService) { }

  listaDeCacniones: Cancion[] = [];
  cancionActual: Cancion = new Cancion();

  ngOnInit(): void {
    this.service.obtenerListaCancionesPublicas().subscribe(lista =>
    {this.listaDeCacniones = lista;
      console.log(lista)
    })
  }

  public IrAStrem(): void{
    this.router.navigateByUrl('/stream');
  }

}
