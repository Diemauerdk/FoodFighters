import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services';
import {Account, Chef} from '@app/_models';
import {ChefService} from "@app/_services/chef.service";
import {UtilityService} from "@app/_services/utility.service";

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    account!: Account;

    constructor(private accountService: AccountService,
                private utilityService: UtilityService,
                private chefService: ChefService) {

    }

    async ngOnInit(): Promise<void> {
      //read from local storage
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      if(username && password) {
        const loggedInAccount = await this.accountService.Authenticate(username, password);
        if(loggedInAccount) {
          const chef = new Chef();
          chef.name = 'Chef ' + this.account.userName;
          chef.accountId = this.utilityService.generateGUID();
          await this.chefService.Add<Chef>(chef);
          localStorage.setItem('dumpling', chef.accountId)
        }
      }
    }
}
