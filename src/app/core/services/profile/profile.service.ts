import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private af: AngularFirestore,
    private auth: AuthService
  ) { }

  getProfile(){
    return new Promise((resolve, reject) => {
      this.auth.user$.subscribe(user => {
        resolve(user);
      });
    })
  }
}
