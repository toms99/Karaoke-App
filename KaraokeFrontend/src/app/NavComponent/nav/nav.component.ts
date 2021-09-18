import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService) { }
  vistaPremium = false
  premium = true


  ngOnInit(): void {
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
