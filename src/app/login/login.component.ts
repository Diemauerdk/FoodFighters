import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AccountService } from '@app/_services';
import {Account} from "@app/_models";
import {AuthenticationService} from "@app/_services/authentication.service";


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent {
    userName: string = '';
    password: string = '';
    loginErrorMessage: string | undefined;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private accountService: AccountService
    ) {

    }

    async ngOnInit(): Promise<void> {

    }

    async login() {
      const authenticated = await this.accountService.Authenticate(this.userName, this.password) as Account;
      // const isAccount = authenticated instanceof Account;
      if(authenticated) {
        console.log('Welcome');
        this.authenticationService.setAndStoreAuthentication(authenticated);
        await this.router.navigate(['chef-list']);
      } else {
        console.log('You will never get in. This app is protected by the most modern security tools.');
        this.loginErrorMessage = 'Wrong credentials. If this keeps happening, keep trying or reach out to our dear PO or QA.'
      }

    }

    async createAccount() {
      await this.router.navigate(['/create-account']);
    }
}
