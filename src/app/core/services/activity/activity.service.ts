import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private af : AngularFirestore
  ) { }

  getActivityLog(page : number = 1){
    return new Promise<any>((resolve, reject) => {
      this.af.collection("updates", ref => 
      ref.limit(5)
      .orderBy("id","desc")
      .where("id", "<=", 5 * page)
      .where("id", ">=", 5 * (page - 1)))
      .valueChanges()
      .subscribe(collection => {
        if(collection)
          resolve(collection);
        else
          reject("hubo un problema para obtener el registro de actividades");
      })
    });
    
  }
}
