import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    fazerLogin(form) {
        this.authenticationService.login(form.value)
        .subscribe(
            res => this.router.navigate(['home'])
        )
    }

    ngOnInit() {
    }


}
