import { Component } from '@angular/core';
import {AccountService} from "@app/_services";
import {first} from "rxjs/operators";
import {Account, Chef} from "@app/_models";
import {ChefService} from "@app/_services/chef.service";

@Component({
  selector: 'app-chef-list',
  templateUrl: './chef-list.component.html',
  styleUrls: ['./chef-list.component.scss']
})
export class ChefListComponent {
  constructor(protected chefService: ChefService) {

  }
  public chefs: Chef[] | undefined;

  async ngOnInit(): Promise<void> {
      try {
        this.chefs = await this.chefService.GetAll<Chef>();

      }catch (e) {
        console.log(e);
      }
  }
}
