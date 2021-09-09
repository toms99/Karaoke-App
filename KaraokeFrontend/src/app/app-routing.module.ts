import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponentComponent} from "./LoginComponents/login-component/login-component.component";
import {NavComponent} from "./NavComponent/nav/nav.component";
import { StreamComponent } from './stream/stream.component';


/**
 * Se utiliza para moverse en las diferentes rutas del proyecto
 */
export let rutas: Routes;
rutas = [ {path: '', component: LoginComponentComponent},
  { path: 'Usuario', component: NavComponent },
  {path: 'stream', component: StreamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
