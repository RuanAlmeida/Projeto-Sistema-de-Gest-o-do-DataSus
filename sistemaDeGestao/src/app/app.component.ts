import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'app';

  constructor (
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  deslogar() {
    swal({
      title: 'Você tem certeza?',
      text: "Você tem certeza que deseja sair?",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, sair!'
    }).then((result) => {
      if (result.value) {
        this.authenticationService.logout();
        this.router.navigate(['login']);
      }
    })
  }
}
