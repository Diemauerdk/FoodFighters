import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from, of, EMPTY } from 'rxjs';
import { map, concatMap, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Account } from '@app/_models';
import {FireBaseService} from "@app/_services/firebase.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";

const baseUrl = `${environment.apiUrl}/accounts`;

@Injectable({ providedIn: 'root' })
export class ChefService extends FireBaseService {

  constructor(angularFireDatabase: AngularFireDatabase) {
    super(angularFireDatabase);
  }

  endpoint: string = 'chef';
}
