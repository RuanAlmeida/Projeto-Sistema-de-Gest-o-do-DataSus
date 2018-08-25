import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { SuiModule } from 'ng2-semantic-ui';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './home/home.component';
import { AppService } from './app.service';
import { FormsModule } from '../../node_modules/@angular/forms';
import { JwtInterceptor } from './services/jwt.interceptor';
import { AuthenticationService } from './services/authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SuiModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
