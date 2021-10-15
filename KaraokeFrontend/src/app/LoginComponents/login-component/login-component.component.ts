import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {User} from "../../Clases/user";
import {CancionesService} from "../../services/canciones.service";
import { CookieService } from 'ngx-cookie-service';
import { LyricsParserService } from 'src/app/services/lyrics-parser.service';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  values = [{value: 'premium', nombre : 'Premium'}, {value: 'user', nombre : 'Estandar'}];
  defaultValue = this.values[0].nombre;
  constructor(private router: Router , private service: LoginService, private cancionesService: CancionesService,
  private cookieService: CookieService, private parser: LyricsParserService) {
  

}
  esPremiun = false;
  usuario: User = new User();
  UsuarioNuevo: User = new User();
  ngOnInit(): void {
    this.parser.tomsify();
  }
  public navegation(): void{
    this.router.navigate(['/Usuario']);
  }

  public crearUsuario():void{
    this.service.registraUsuario(this.UsuarioNuevo).subscribe(res => {
      console.log(res);
      alert("Usuario creado con éxito.");
    },
      error => {
      console.log(error);
      alert(error.error.message)
      }
    );
  }

  public login(user: User): void{
    this.service.hacerLogin(user).subscribe(response =>{
      // @ts-ignore
      if(response.token){
        // @ts-ignore
        this.cookieService.set("token", response.token);
        // @ts-ignore
        this.cookieService.set("key", response.key);
        // @ts-ignore
        this.cookieService.set("rol", response.rol);
        // @ts-ignore
        this.cookieService.set("user", JSON.stringify(this.usuario));
        this.router.navigate(['/Usuario'])
      }
      else{
        alert('Error al ingresar,Favor ingresar un usario y contraseña validos');
      }
    })
    // this.loading = !this.loading;
  }
}
