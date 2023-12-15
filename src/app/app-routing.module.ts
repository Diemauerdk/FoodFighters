import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import {ChefListComponent} from "@app/pages/chef-list/chef-list/chef-list.component";
import {CreateAccountComponent} from "@app/create-account/create-account/create-account.component";

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'chef-list', component: ChefListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'create-account', component: CreateAccountComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
