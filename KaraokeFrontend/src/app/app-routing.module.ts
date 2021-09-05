import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponentComponent} from "./LoginComponents/login-component/login-component.component";


/**
 * Se utiliza para moverse en las diferentes rutas del proyecto
 */
export let rutas: Routes;
rutas = [ {path: '', component: LoginComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
