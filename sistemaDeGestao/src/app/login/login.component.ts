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

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    fazerLogin(fLogin: NgForm) {
        this.authenticationService.login(fLogin.value)
        .subscribe(
            res => {
                this.router.navigate([this.returnUrl]);
                console.log(res);
            },
            erro => console.error(erro)
        )
    }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

}
