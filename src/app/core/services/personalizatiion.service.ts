import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonalizatiionService {

  constructor(
    private angularFirestore : AngularFirestore,
    private angularFirestorage : AngularFireStorage
  ) { }

  async uploadCover( file : File) : Promise<any>{
    return new Promise<any>((resolve, reject) => {
      let ref = this.angularFirestorage.ref("info/cover.png");
      let task = ref.put(file);
      task.snapshotChanges()
      .pipe(finalize(() => {
        ref.getDownloadURL().pipe(take(1)).toPromise()
        .then(url => {
          this.angularFirestore.doc("/info/cover").update({cover : url})
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
        })
      }))
      .subscribe();
    })
  }

  async uploadBackground( file : File ) : Promise<any>{
    return new Promise<any>((resolve, reject) => {
      let ref  = this.angularFirestorage.ref('info/background.png');
      let task = ref.put(file);
      task.snapshotChanges()
      .pipe(finalize(() => {
        ref.getDownloadURL().pipe(take(1)).toPromise()
        .then(url => {
          this.angularFirestore.doc("/info/background").update({background: url})
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
        })
        .catch(err => {
          reject(err);
        })
      }))
      .subscribe()
    })
  }
}
