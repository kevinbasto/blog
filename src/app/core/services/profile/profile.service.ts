import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, take } from 'rxjs/operators';
import { User } from '../../interfaces/user';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private af: AngularFirestore,
    private as: AngularFireStorage,
    private auth: AuthService
  ) { }

  getProfile() {
    return new Promise<User>((resolve, reject) => {
      this.auth.user$.subscribe(user => {
        if (user)
          resolve(user);
        else
          reject("Hubo un error a la hora de recuperar al usuario");
      });
    })
  }

  editProfile(username: string, file: File) {
    return new Promise<any>(async (resolve, reject) => {
      let uid: string;
      await this.auth.user$.pipe(take(1)).toPromise()
        .then(user => {
          uid = user.uid;
        })
      let ref = this.as.ref(`${uid}/${file.name}`)
      let task = ref.put(file);
      task.snapshotChanges()
        .pipe(finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            this.af.collection('users')
              .doc(uid)
              .update({
                username: username,
                picture: url
              })
              .then(() => {
                resolve("Actualización hecha con éxito")
              })
              .catch(error => {
                console.log("Hubo un problema a la hora de actualizar la foto")
                reject({
                  title: "Hubo un problema a la hora de actualizar la foto",
                  error : error
                })
              });
          })
        }))
        .subscribe();
    });
  }
}
