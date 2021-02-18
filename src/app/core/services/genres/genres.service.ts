import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(
    private af : AngularFirestore,
    private router: Router
  ) {
    this.genre$ = new Observable(obs => {
      this.router.events.subscribe(event => {
        if( event instanceof NavigationEnd){
          let genre  = event.url.split("/")[event.url.split("/").length-1];
          obs.next(genre);
        }
      });
    });
   }

  public genre$ : Observable<string>;

  getPage(genre : string, smallestId : number = 0){
    return new Promise<any>((resolve, reject) => {
      if(smallestId == 0){
        this.af.collection(genre, ref => ref.limit(5).orderBy('id', 'desc'))
        .valueChanges()
        .subscribe(page => resolve(page));
      }else{
        this.af.collection(genre, 
          ref => ref.limit(5)
          .where('id', '<', smallestId)
          .orderBy('id', 'desc'))
          .valueChanges()
          .subscribe(page => resolve(page));
      }
    });
  }

  /*getCollection(genre: string){
    return new Promise<any>((resolve,reject) => {
      this.af.collection(genre, ref => ref.limit(5).orderBy('id','desc'))
      .valueChanges()
      .subscribe(collection => {
        resolve(collection);
      })
    })
  }

  getCollectionNextPage(genre : string, page : number){
    return new Promise<any>((resolve, reject) => {
      this.af.collection(genre, ref => 
        ref.where('id', '<' , 5 * (page-1)))
        .valueChanges().subscribe(collectionPage => resolve(collectionPage))
    });
  }*/
}
