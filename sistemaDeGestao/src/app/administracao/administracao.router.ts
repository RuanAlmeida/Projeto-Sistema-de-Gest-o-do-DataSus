import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AdministracaoComponent } from './administracao.component';
import { GestorAddEditComponent } from './gestor-add-edit/gestor-add-edit.component';

const AdminRoutes = [
    { path: '', component: AdministracaoComponent },
    { path: 'novo', component: GestorAddEditComponent },
    { path: 'edit/:id', component: GestorAddEditComponent }
];


@NgModule({
    imports: [
        RouterModule.forChild(AdminRoutes)
    ],
    exports: [RouterModule]
})

export class AdministracaoRoutingModule {}
