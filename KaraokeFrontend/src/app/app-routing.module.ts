import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponentComponent} from "./LoginComponents/login-component/login-component.component";
import {NavComponent} from "./NavComponent/nav/nav.component";
import { StreamComponent } from './stream/stream.component';
import {VistaPremiumComponent} from "./PremiumComponent/vista-premium/vista-premium.component";
import {PruebaComponent} from "./prueba/prueba.component";


/**
 * Se utiliza para moverse en las diferentes rutas del proyecto
 */
export let rutas: Routes;
rutas = [ {path: '', component: PruebaComponent},
  { path: 'Usuario', component: NavComponent},
  {path: 'stream', component: StreamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
