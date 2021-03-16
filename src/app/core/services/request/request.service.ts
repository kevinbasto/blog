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

  async accept(id : string) : Promise<boolean>{
    await this.af.doc(`/requests/${id}`)
    .update({
      accepted : true
    })
    await this.af.doc(`/requests/${id}`)
    .valueChanges()
    .pipe(take(1))
    .toPromise()
    .then( (request : any) => {
      let uid = request.uid;
      this.af.doc(`/users/${uid}`)
      .update({
        role: "staff",
        roleId: 3
      })
    })
    .catch(error => {
      return false;
    })

    this.af.doc(`/requests/${id}`).delete();
    return true;
  }

  async deny(id : string ) : Promise<boolean>{
    await this.af.doc(`/requests/${id}`).delete()
    return true;
  }
}
