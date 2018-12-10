import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    public authenticationService: AuthenticationService,
    private storage: StorageService
  ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const localUser = this.storage.getLocalUser();

        if (localUser) {
          const authReq = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + localUser.token)});
          return next.handle(authReq);
      }
        return next.handle(request)
        .do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }
            }, (err: any) => {
               if (err instanceof HttpErrorResponse) {
                if (err.status === 401 || err.status === 403) {
                  this.authenticationService.logout();
                }
               }
             });
    }
}


