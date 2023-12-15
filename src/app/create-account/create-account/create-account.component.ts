import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "@app/_services";
import {Account} from "@app/_models";
import {UtilityService} from "@app/_services/utility.service";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  account: Account = new Account();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private utilityService: UtilityService,
  ) {

  }

  async create() {
    this.account.id = this.utilityService.generateGUID();
    console.log(this.account)
    await this.accountService.Add(this.account);
  }
}
