import { Injectable } from '@angular/core';
import {FireBaseService} from "@app/_services/firebase.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {map} from "rxjs";
import {Account} from "@app/_models";


@Injectable({ providedIn: 'root' })
export class AccountService extends FireBaseService {

  constructor(angularFireDatabase: AngularFireDatabase) {
    super(angularFireDatabase);
  }

  async Authenticate<Account>(username: string, password: string): Promise<Account | undefined> {
    return new Promise((resolve, reject) => {
      this.angularFireDatabase.list(this.endpoint).snapshotChanges()
        .pipe(
          map(changes =>{
              return changes.map(c => (c.payload.toJSON()))
            }
          )
        )
        .subscribe(allItems => {
          const items = allItems.filter(item => (item as any).userName == username && (item as any).password == password);
          if(items.length > 0) {
            resolve(items[0] as Account);
          } else {
            resolve(undefined)
          }

        }, reject);
    });
  }

  endpoint: string = 'account';

}
