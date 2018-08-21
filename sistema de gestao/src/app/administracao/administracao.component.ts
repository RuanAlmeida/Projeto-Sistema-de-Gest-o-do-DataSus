import { Component, OnInit } from '@angular/core';
import { AdministracaoService } from './administracao.service';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.scss']
})
export class AdministracaoComponent implements OnInit {
  gestores: any;

  constructor(
    private administracaoService: AdministracaoService
  ) { }

  getGestores() {
    this.administracaoService.getGestores().subscribe(
      res => {
        this.gestores = res;
        console.log(res);
      }
    );
  }

  removerGestor(cpf, index) {
    this.administracaoService.deleteGestor(cpf).subscribe(
      res => {
        console.log(res);
        this.gestores.splice(index, 1);
      },
      erro => {
        console.log(erro);
      }
    );
  }

  ngOnInit() {
    this.getGestores();
  }

}
