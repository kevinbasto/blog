import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../interfaces/user';
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
    return new Promise<User>((resolve, reject) => {
      this.auth.user$.subscribe(user => {
        if(user)
          resolve(user);
        else
          reject("Hubo un error a la hora de recuperar al usuario");
      });
    })
  }
}
