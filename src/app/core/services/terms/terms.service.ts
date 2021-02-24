import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TermsService {

  constructor(
    private af : AngularFirestore
  ) { }

  getTerms(){
    return new Promise<any>(async (resolve, reject) => {
      this.af
      .collection("terms")
      .doc("terms")
      .valueChanges()
      .pipe(take(1))
      .toPromise()
      .then(terms => {
        if(terms != null){
          resolve(terms);
        }else{
          reject("lo sentimos, no pudimos obtener los términos y condiciones :(")
        }
      })
      .catch(error => {
        reject(error);
      })
    });
  }
}
