import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './AppComponent/app.component';
import { LoginComponentComponent } from './LoginComponents/login-component/login-component.component';
import { NavComponent } from './NavComponent/nav/nav.component';
import { ReproductionFileComponent } from './SelectComponents/reproduction-file/reproduction-file.component';
import { StreamComponent } from './stream/stream.component';
import { VistaPremiumComponent } from './PremiumComponent/vista-premium/vista-premium.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import { BehaviorSubject } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    NavComponent,
    ReproductionFileComponent,
    StreamComponent,
    VistaPremiumComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [CookieService],
  bootstrap: [AppComponent]

})
export class AppModule { }
