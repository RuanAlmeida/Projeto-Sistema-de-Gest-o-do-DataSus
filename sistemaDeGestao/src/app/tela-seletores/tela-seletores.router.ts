import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { TelaSeletoresIqsComponent } from './tela-seletores-iqs/tela-seletores-iqs.component';
import { TelaSeletoresIrsComponent } from './tela-seletores-irs/tela-seletores-irs.component';

const TelaSeletoresRoutes = [
    { path: 'iradarsaude', component: TelaSeletoresIrsComponent },
    { path: 'iqualitysaude', component: TelaSeletoresIqsComponent }
];


@NgModule({
    imports: [
        RouterModule.forChild(TelaSeletoresRoutes)
    ],
    exports: [RouterModule]
})
export class TelaSeletoresRoutingModule { }
