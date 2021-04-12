import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private af : AngularFirestore
  ) { }

  getStaff(){
    return new Promise<any>((resolve, reject) => {
      this.af.collection('users', ref => ref.where('role', '==', 'staff'))
      .valueChanges()
      .pipe(take(1))
      .toPromise()
      .then(result => {
        resolve(result);
      })
      .catch(error => reject(error));
    });
  }
}
