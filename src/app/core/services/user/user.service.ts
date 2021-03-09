import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private af : AngularFirestore
  ) { }

  getData(uid : string){
    return new Promise<any>((resolve, reject) => {
      this.af.doc(`/users/${uid}`)
      .valueChanges()
      .pipe(take(1))
      .toPromise()
      .then(user => {
        resolve(user);
      })
      .catch(error => {
        reject(error);
      })
    });
  }


  setData(user : any){
    return new Promise<any>((resolve, reject) => {
      this.af.doc(`/users/${user.uid}`)
      .set(user)
      .then(response => resolve(response))
      .catch(error => reject(error));
    });
  }
}
