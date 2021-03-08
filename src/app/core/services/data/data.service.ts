import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private af : AngularFirestore
  ) { }
  
  getFromCollection(collection : string, lowestId: number, pageSize : number){
    return new Promise<any>(async(resolve, reject) => {
      this.af.collection(collection, ref => 
        ref.where("id", "<", lowestId)
        .limit(pageSize)
        .orderBy("id", "desc"))
        .valueChanges()
        .pipe(take(1))
        .toPromise()
        .then(collection => resolve(collection))
        .catch(error => reject(error));
    });
  }

}
