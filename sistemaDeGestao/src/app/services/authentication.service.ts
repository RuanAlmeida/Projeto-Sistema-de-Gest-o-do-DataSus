import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { API } from '../config/api.config';
import { LocalUser } from '../models/local_user';
import { StorageService } from './storage.service';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  jwtHelper: JwtHelper = new JwtHelper();

    constructor(
      private http: HttpClient,
      private storage: StorageService,
      private router: Router,
    ) { }

    login(user) {
        return this.http.post(`${API.ROTAS_API}/login`, user,
        {
          observe: 'response',
          responseType: 'text'
        });
    }

    successfulLogin(authorizationValue: String) {
      const tok = authorizationValue.substring(7);
      const user: LocalUser = {
          token: tok,
          gestor: this.jwtHelper.decodeToken(tok).sub
      };
      this.storage.setLocalUser(user);
  }

  logout() {
      this.storage.setLocalUser(null);
      this.router.navigate(['/login']);
  }

}
