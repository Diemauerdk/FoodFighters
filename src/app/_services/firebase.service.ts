import {
    AngularFireDatabase,
    AngularFireList,
    AngularFireObject,
  } from '@angular/fire/compat/database';
import {map} from "rxjs";

export abstract class FireBaseService {
    public abstract endpoint: string;
    constructor(private angularFireDatabase: AngularFireDatabase) {}

    async Add<T>(model: T) : Promise<void> {
        return this.angularFireDatabase.object(`${this.endpoint}`).set(model);
    }

    async Get<T>(key: string): Promise<AngularFireObject<T>> {
        return this.angularFireDatabase.object<T>(`${this.endpoint}/${key}`);
    }

    async GetAll<T>(): Promise<T[] | undefined > {
      return this.angularFireDatabase.list(this.endpoint).snapshotChanges()
        .pipe(
          map(snapshots => {
            return snapshots.map(snapshot => snapshot.payload.val()  as T);
          })
        ).toPromise();
    }

    async Update<T>(key: string, data: any): Promise<void> {
        return this.angularFireDatabase.object<T>(`${this.endpoint}/${key}`).update(data);
    }

    async delete<T>(key: string): Promise<void> {
        return this.angularFireDatabase.object<T>(`${this.endpoint}/${key}`).remove();
    }

  async Any<T>(id: string): Promise<boolean> {
    var result: boolean = false;

    try {
      const allItems = await this.GetAll<T>();

      if(allItems) {
        result = allItems.some(item => (item as any).id === id);;
      }
    } catch (e) {
      const crap = e;
    }

    return result;
  }

  async existsWithId<T>(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.angularFireDatabase.list(this.endpoint).snapshotChanges()
        .pipe(
          map(changes =>{
              return changes.map(c => (c.payload.toJSON()))
            }
          )
        )
        .subscribe(allItems => {
          const exists = allItems.some(item => (item as any).id === id);
          resolve(exists);
        }, reject);
    });
  }
  }
