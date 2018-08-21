import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  emitirUsuario = new EventEmitter();

    constructor(
      private http: HttpClient,
      private router: Router
    ) { }

    login(user) {
      console.log(user);
        return this.http.post<any>(`http://localhost:8080/autentica`, user)
            .map(res => {

              if (res) {
                localStorage.setItem('currentUser', res);
                // localStorage.setItem('currentCode', res.cod_usuario_cript);
                // localStorage.setItem('currentUserCode', res.cod_usuario);
              }
              this.emitirUsuario.emit(res);
            });
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
  this.router.navigate(['login']);
}

isLogado() {
  if (localStorage.getItem('currentUser')) {
    return true;
  } else {
    return false;
  }
}

}
