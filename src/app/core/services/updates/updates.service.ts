import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UpdatesService {

  constructor(
    private af: AngularFirestore
  ) { }

  retrieveData(){
    return new Promise<any>((resolve, reject) => {
      this.af
      .collection('updates', ref=> ref.limit(5).orderBy('id', 'desc') )
      .valueChanges()
      .subscribe((res: any) => {
        resolve(res);
      });
    });
  }
}
