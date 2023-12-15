import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';

import { AccountService } from '@app/_services';
import {AuthenticationService} from "@app/_services/authentication.service";
import {Account} from "@app/_models";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private accountService: AccountService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const storedAuthentication = this.authenticationService.getStoredAuthentication();
      if(storedAuthentication && storedAuthentication.userName && storedAuthentication.password) {
        const loggedInAccount = await this.accountService.Authenticate(storedAuthentication.userName, storedAuthentication.password);

        if(loggedInAccount) {
          this.authenticationService.setAndStoreAuthentication(loggedInAccount as Account);
          return true;
        } else {
          await this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      } else {
        // not logged in so redirect to login page with the return url
        await this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }
}
