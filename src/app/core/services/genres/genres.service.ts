import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { of, VirtualTimeScheduler } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(
    private af : AngularFirestore,
    private router: Router
  ) { }

  getCollection(genre: string){
    return new Promise<any>((resolve,reject) => {
      this.af.collection(genre, ref => ref.limit(5).where('id', '<=', 5))
      .valueChanges()
      .subscribe(collection => {
        resolve(collection);
      })
    })
  }
}
