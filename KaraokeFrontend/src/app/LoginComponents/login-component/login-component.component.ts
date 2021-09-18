import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {User} from "../../Clases/user";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private router: Router , private service: LoginService) { }
  usuario: User = new User();
  ngOnInit(): void {
  }
  public navegation(): void{
    this.router.navigate(['/Usuario']);
  }

  public login(user: User): void{
    this.service.hacerLogin(user).subscribe(response =>{
      console.log(response);
      // @ts-ignore
      if(response.token){
        this.router.navigate(['/Usuario'])
      }
      else{
        alert('Error al ingresar,Favor ingresar un usario y contraseña validos');
      }
    })
  }
}
