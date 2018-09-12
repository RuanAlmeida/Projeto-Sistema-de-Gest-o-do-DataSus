import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentUser = this.authenticationService.getToken();
        const currentUserCode = this.authenticationService.getUserCode();
        const currentCode = this.authenticationService.getCode();

        if (currentUser) {
        request = request.clone({
            setHeaders: {
            'x-access-token': currentUser,
            'id-gestores': currentUserCode,
            'id-gestores-cript': currentCode
          }
        });
      }
        return next.handle(request)
        .do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }
            }, (err: any) => {
               if (err instanceof HttpErrorResponse) {
                if (err.status === 401 || err.status === 403) {
                  this.authenticationService.logout();
                  this.router.navigate(['login']);
                }
               }
             });
    }
}
