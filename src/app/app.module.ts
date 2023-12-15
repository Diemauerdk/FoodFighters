import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './_helpers';
import { AccountService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from '@environments/environment';
import { ChefListComponent } from './pages/chef-list/chef-list/chef-list.component';;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { CreateAccountComponent } from './create-account/create-account/create-account.component';
import { ChefAdminComponent } from './pages/chef-list/chef-admin/chef-admin.component';
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatExpansionModule,
        MatInputModule,
        MatButtonModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
,
        BrowserAnimationsModule    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        ChefListComponent,
        CreateAccountComponent,
        ChefAdminComponent
    ],
    providers: [

        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
