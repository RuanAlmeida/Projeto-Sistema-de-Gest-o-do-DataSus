
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { STORAGE_KEYS } from '../config/storage_keys.config';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem(STORAGE_KEYS.localUser) !== null) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['login']);
    return false;
  }


  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canLoad: verificando se usuário pode carregar o cod módulo');

    return true;
  }


}
