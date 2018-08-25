import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgPipesModule } from 'ngx-pipes';


import { SuiModule, SuiCheckboxModule, SuiRatingModule } from 'ng2-semantic-ui';

import { TelaSeletoresRoutingModule } from './tela-seletores.router';
import { TelaSeletoresService } from './tela-seletores.service';
import { TelaSeletoresIrsComponent } from './tela-seletores-irs/tela-seletores-irs.component';
import { TelaSeletoresIqsComponent } from './tela-seletores-iqs/tela-seletores-iqs.component';

@NgModule({
  imports: [
    CommonModule,
    SuiModule,
    SuiCheckboxModule,
    SuiRatingModule,
    FormsModule,
    ReactiveFormsModule,
    TelaSeletoresRoutingModule,
    HttpModule,
    NgPipesModule
  ],
  declarations: [
    TelaSeletoresIrsComponent,
    TelaSeletoresIqsComponent
  ],
    exports: [
    ],
  providers: [
    TelaSeletoresService
  ]
})

export class TelaSeletoresModule { }
