import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    returnUrl: string;
    logando: boolean;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private auth: AuthenticationService
    ) { }

    fazerLogin(fLogin: NgForm) {
        this.logando = true;
        this.authenticationService.login(fLogin.value)
        .subscribe(
            res => {
                this.auth.successfulLogin(res.headers.get('Authorization'));
                this.router.navigate(['/home']);
                this.logando = false;
            },
            erro => {
                console.error(erro);
                this.logando = false;
            }
        );
    }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

}
