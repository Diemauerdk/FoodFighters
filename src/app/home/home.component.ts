import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services';
import {Account, Chef} from '@app/_models';
import {ChefService} from "@app/_services/chef.service";

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    account!: Account;

    constructor(private accountService: AccountService,
                private chefService: ChefService) {

    }

    async ngOnInit(): Promise<void> {
      this.accountService.getAccount()
          .pipe(first())
          .subscribe(async x => {
            this.account = x as Account;

            try {
              const list = await this.chefService.GetAll<Chef>();
              const exists = await this.chefService.existsWithId<Chef>(this.account.facebookId);
              if(exists === false) {
                const chef = new Chef();
                chef.name = 'Chef' + this.account.name;
                chef.id = this.account.facebookId;
                await this.chefService.Add<Chef>(chef);
              }
            }catch (e) {
              console.log(e);
            }

          });
    }

    private generateGUID(): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
}
