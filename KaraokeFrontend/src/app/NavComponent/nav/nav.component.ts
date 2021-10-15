import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Busqueda } from "../../Clases/busqueda";
import { templateJitUrl } from "@angular/compiler";
import { BusquedaService } from "../../services/busqueda.service";
import { Cancion } from 'src/app/Clases/Cancion';
import { ListaCancionesAuxService } from 'src/app/services/lista-canciones-aux.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router,
    private cookieService: CookieService,
    private busquedaService: BusquedaService,
    private listaCancionesService: ListaCancionesAuxService) { }

  vistaPremium = false
  premium = true

  values = [{ value: 'Nombre', nombre: 'Nombre' },
    { value: 'Artista', nombre: 'Artista' },
    { value: 'Album', nombre: 'Album' },
    { value: 'Letra', nombre: 'Letra' }];
  
  defaultValue = this.values[3].nombre;

  busqueda: Busqueda = new Busqueda();
  tipoBusqueda: string = ''
  informacionBusqueda: string = ''
  listaDeCanciones: Cancion[] = [];

  ngOnInit(): void {
    this.listaCancionesService.sharedListaCanciones.subscribe(listaCanciones => this.listaDeCanciones = listaCanciones)
    console.log(JSON.parse(this.cookieService.get('user')))
    this.tipoUsuario();
  }

  public tipoUsuario(): void {
    this.premium = (this.cookieService.get('rol') === 'premium')

  }

  public buscarCancionN(): void {
    if (this.tipoBusqueda === "Artista") {
      this.busqueda.artista = this.informacionBusqueda
    }
    else if (this.tipoBusqueda === "Nombre") {
      this.busqueda.nombre = this.informacionBusqueda
    }
    else if (this.tipoBusqueda === "Album") {
      this.busqueda.album = this.informacionBusqueda
    }
    else if (this.tipoBusqueda === "Letra") {
      this.busqueda.letraCruda = this.informacionBusqueda
    }
    else {
      alert('Debe selecionar un tipo de busqueda')
      return
    }
    if (this.vistaPremium) {
      this.busqueda.user = JSON.parse(this.cookieService.get('user')).username
    }
    this.busquedaService.busqueda(this.busqueda).subscribe(resp => {
      this.busqueda = new Busqueda()

      this.listaCancionesService.nextListaDeCanciones(resp)
      console.log(resp)
    });
  }


  public navigate(comprobacion: string): void {
    if (comprobacion === 'UsuarioPremium') {
      this.vistaPremium = true;
    }
    if (comprobacion === 'Inicio') {
      this.vistaPremium = false;
    }
    if (comprobacion === 'CerrarSesion') {
      this.cookieService.delete('token')
      this.cookieService.delete('user')
      this.router.navigateByUrl('');
    }

  }

}
