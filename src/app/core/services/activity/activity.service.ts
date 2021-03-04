import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private af : AngularFirestore
  ) { }

  getActivityLog(lowestId : number, pagesize : number){
    return new Promise<any>((resolve, reject) => {
      this.af.collection("updates", ref => 
      ref.limit(pagesize)
      .where("id", "<", lowestId)
      .orderBy("id", "desc")
      ).valueChanges()
      .subscribe(updates => {
        if(updates){
          resolve(updates)
        }
        else
          reject("Hubo un problema a la hora de recuperar las actualizaciones")
      })
    });
    
  }
}
