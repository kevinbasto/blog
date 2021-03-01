import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private af : AngularFirestore
  ) { }

  getActivityLog(pageSize : number, page : number = Infinity,){
    return new Promise<any>((resolve, reject) => {
      if(page == Infinity){
        this.af.collection("updates", ref => 
          ref.limit(pageSize)
          .orderBy("id", "desc")
        ).valueChanges()
        .subscribe(collection => {
          if(collection)
            resolve(collection)
          else
            reject("hubo un problema al obtener los registros");
        })
      }else{
        this.af.collection("updates", ref => 
        ref.limit(pageSize)
        .where("id", ">", pageSize * (page - 1))
        .where("id", "<=", pageSize * page)
        ).valueChanges()
        .subscribe(collection => {
          if(collection)
            resolve(collection)
          else
            reject("hubo un problema al obtener los datos");
        })
      }
    });
    
  }
}
