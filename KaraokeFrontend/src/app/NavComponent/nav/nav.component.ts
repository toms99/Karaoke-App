import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router) { }
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

  }

}
