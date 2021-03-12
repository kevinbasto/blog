import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private af : AngularFirestore
  ) { }

  getRequest(id : string){
    return new Promise<any>(async (resolve, reject) => {
      await this.af.doc(`/requests/${id}`)
      .valueChanges()
      .pipe(
        take(1),
      )
      .toPromise()
      .then(request => resolve(request))
      .catch(error => reject(error));
    })
  }
}
