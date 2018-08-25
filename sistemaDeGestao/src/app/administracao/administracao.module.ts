import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SuiModule, SuiCheckboxModule, SuiRatingModule } from 'ng2-semantic-ui';


import { AdministracaoComponent } from './administracao.component';
import { AdministracaoService } from './administracao.service';
import { AdministracaoRoutingModule } from './administracao.router';
import { GestorAddEditComponent } from './gestor-add-edit/gestor-add-edit.component';

@NgModule({
  imports: [
    CommonModule,
    SuiModule,
    SuiCheckboxModule,
    SuiRatingModule,
    FormsModule,
    ReactiveFormsModule,
    AdministracaoRoutingModule
  ],
  declarations: [
    AdministracaoComponent,
    GestorAddEditComponent
  ],
    exports: [
    ],
  providers: [
    AdministracaoService
  ]
})
export class AdministracaoModule { }
