import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

// rxjs tools used
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface Error {
  a?: any;
  code: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private errorCode: any = {
    "auth/invalid-password": "La contraseña proporcionada debe ser de al menos 6 caracteres.",
    "auth/email-already-exists": "La cuenta de correo proporcionada ya se encuentra en uso por otra cuenta.",
    "auth/email-already-in-use": "La cuenta de correo proporcionada ya se encuentra en uso.",
    "auth/invalid-email": "Proporcione una cuenta de correo válida",
    "auth/user-not-found": "No existe una cuenta de usuario con el correo electrónico proporcionado",
    "auth/wrong-password": "La contraseña proporcionada es incorrecta",
    "auth/too-many-requests": "Demasiados intentos de inicio de sesión fallidos. Por favor, inténtelo de nuevo más tarde.",
    "auth/argument-error": "Información inválida por favor verifiquela nuevamente",
    "auth/invalid-action-code": "Acción denegada asegurese de estar utilizando un link de activación vigente, si el error persiste solicite de nuevo el correo de activación",
    "auth/user-disabled": "La cuenta de usuario se encuentra deshabilitada",
    "auth/phone-number-already-exists": "El teléfono proporcionado ya se encuentra en uso por otro usuario.",
    "auth/network-request-failed": "No se ha podido establecer comunicación con el servidor, revise su conexión a internet"
  };
  public user$: Observable<any>;


  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));

  }

  parseError(error: Error): string {
    return this.errorCode[error.code] ? this.errorCode[error.code] : "Ha ocurrido un error no identificado, por favor intentelo nuevamente mas tarde";
  }

  async register(username : string, email : string, password : string){
    try{
      return await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(register => {
        this.afs.collection('users').doc(register.user?.uid).set({
          username: username,
          email: email,
          role: "reader",
          roleId: 1,
          banned: false
        });
      });
    }
    catch(error){
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    }
    catch (exception) {
      throw exception;
    }
  }

  async signout() {
    try {
      await this.afAuth.signOut();
      return this.router.navigate(['/auth/login']);
    }
    catch (exception) {
      throw exception;
    }
  }
}
