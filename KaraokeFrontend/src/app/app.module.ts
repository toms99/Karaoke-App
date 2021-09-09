import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './AppComponent/app.component';
import { LoginComponentComponent } from './LoginComponents/login-component/login-component.component';
import { NavComponent } from './NavComponent/nav/nav.component';
import { ReproductionFileComponent } from './SelectComponents/reproduction-file/reproduction-file.component';
import { ScrollAnimationDirective } from './directives/scroll-animation.directive';
import { StreamComponent } from './stream/stream.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    NavComponent,
    ReproductionFileComponent,
    ScrollAnimationDirective,
    StreamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
