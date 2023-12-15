import { Component } from '@angular/core';

import { AccountService } from './_services';
import {ActivatedRoute, Router} from "@angular/router";
import {UtilityService} from "@app/_services/utility.service";
import {Account, Chef} from "@app/_models";
import {AuthenticationService} from "@app/_services/authentication.service";

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
  authenticatedAccount: Account | undefined

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private authenticationService: AuthenticationService
  ) {

  }

  async ngOnInit(): Promise<void> {
    try {
      this.authenticatedAccount = await this.authenticationService.getStoredAuthentication();

    }catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      this.authenticationService.clearStoredAuthentication();
      await this.router.navigate(['/']);
    }catch (e) {
      console.log(e);
    }
  }
}
