import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { API } from '../app.api';

@Injectable()
export class AuthenticationService {

    constructor(
      private http: HttpClient,
      private router: Router
    ) { }

    login(user) {
      this.logout();
        return this.http.post<any>(`${API.AUTH_API}autentica`, user)
            .map(res => {
              if (res) {
                localStorage.setItem('currentUser', res.token);
                localStorage.setItem('currentCode', res.idGestores_cript);
                localStorage.setItem('currentUserCode', res.idGestores);
              }
            },
          erro => console.error(erro)
          );
    }

getToken() {
  return localStorage.getItem('currentUser');
}

getCode() {
  return localStorage.getItem('currentCode');
}

getUserCode() {
  return localStorage.getItem('currentUserCode');
}

verificaUser(): string {
  return localStorage.getItem('currentUserCode');
}

logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentCode');
  localStorage.removeItem('currentUserCode');
}

isLogado() {
  if (localStorage.getItem('currentUser')) {
    return true;
  } else {
    return false;
  }
}

}
