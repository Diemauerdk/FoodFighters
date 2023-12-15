import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "@app/_services";
import {UtilityService} from "@app/_services/utility.service";
import {Account} from "@app/_models";
import {AuthenticationService} from "@app/_services/authentication.service";

@Component({
  selector: 'app-chef-admin',
  templateUrl: './chef-admin.component.html',
  styleUrls: ['./chef-admin.component.scss']
})
export class ChefAdminComponent {
  panelOpenState = false;
  account: Account | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {

  }

  async ngOnInit(): Promise<void> {
    //read from local storage
    this.account = await this.authenticationService.getAuthentication();
  }

}
