import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Busqueda} from "../../Clases/busqueda";
import {templateJitUrl} from "@angular/compiler";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService) { }
  vistaPremium = false
  premium = true

  busqueda: Busqueda = new Busqueda();
  tipoBusqueda: string = ''
  informacionBusqueda: string = ''

  ngOnInit(): void {
    console.log(JSON.parse(this.cookieService.get('user')))
    this.tipoUsuario();
  }

  public tipoUsuario(): void{
    this.premium = JSON.parse(this.cookieService.get('user')).rol === 'premium';

  }

  public buscarCancionN():void{
    if(this.tipoBusqueda === "Artista"){
      if(this.vistaPremium){

      }
      this.busqueda.artista = this.informacionBusqueda
    }
    if(this.tipoBusqueda === "Nombre"){
      if(this.vistaPremium){

      }
      this.busqueda.nombre = this.informacionBusqueda
    }
    if(this.tipoBusqueda === "Album"){
      if(this.vistaPremium){

      }
      this.busqueda.album = this.informacionBusqueda
    }
    if(this.tipoBusqueda === "Letra"){
      if(this.vistaPremium){

      }
      this.busqueda.letraCruda = this.informacionBusqueda
    }else{
      alert('Debe selecionar un tipo de busqueda')
    }
  }
  public navigate(comprobacion: string): void {
    if(comprobacion === 'UsuarioPremium'){
      this.vistaPremium = true;
    }
    if(comprobacion === 'Inicio'){
      this.vistaPremium = false;
    }
    if(comprobacion === 'CerrarSesion'){
      this.cookieService.delete('token')
      this.cookieService.delete('user')
      this.router.navigateByUrl('');
    }

  }

}
