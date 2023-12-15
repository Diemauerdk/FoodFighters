import { Injectable } from '@angular/core';
import {Account} from "@app/_models";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  currentlyLoggedInUser: Account | undefined;

  constructor() {

  }

  clearStoredAuthentication(): void {
    localStorage.removeItem('password');
    localStorage.removeItem('username');
  }

  setAndStoreAuthentication(account: Account) {
    this.currentlyLoggedInUser = account;
    if (account.userName != null) {
      localStorage.setItem('username', account.userName)
    }
    if (account.password != null) {
      localStorage.setItem('password', account.password)
    }
  }

  getAuthentication() : Account | undefined {
    return this.currentlyLoggedInUser;
  }

  getStoredAuthentication() : Account | undefined {
    let account: Account | undefined;

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if(username && password) {
      account = new Account();
      account.userName = username;
      account.password = password;
    } else {
      account = undefined;
    }

    return account;
  }
}
