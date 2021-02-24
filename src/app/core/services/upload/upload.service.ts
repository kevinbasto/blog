import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private af: AngularFirestore,
    private auth: AuthService
  ) { }

  submit(name: string, reason: string, genres: string) {
    return new Promise<any>(async (resolve, reject) => {
      let uid;
      let username;
      let time = new Date();
      let utcDate = {
        year: time.getUTCFullYear(),
        month: time.getUTCMonth(),
        date: time.getUTCDate(),
        day: time.getUTCDay(),
        hour: time.getUTCHours(),
        minutes: time.getUTCMinutes(),
        seconds: time.getUTCSeconds(),
      };
      let miltime =  new Date(utcDate.year, utcDate.month, utcDate.date, utcDate.hour, utcDate.minutes, 0, 0);
      time = new Date(miltime.getTime() - (5 * 60 * 60 * 1000));
      let email;
      await this.auth.user$
        .pipe(take(1))
        .toPromise()
        .then(auth => {
          uid = auth.uid;
          username = auth.username;
          email = auth.email;
        });
      this.af.collection("requests").add({
        uid: uid,
        username: username,
        email: email,
        name: name,
        rease: reason,
        genres: genres,
        accepted: false,
        date: time
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      })

    });
  }
}
