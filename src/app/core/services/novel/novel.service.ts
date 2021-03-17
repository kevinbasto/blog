import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Novel } from '../../interfaces/novel';

@Injectable({
  providedIn: 'root'
})
export class NovelService {

  constructor(
    private router: Router,
    private af: AngularFirestore
  ) { }

  public genre: string;
  public id: string;

  getNovelData() {
    return new Promise<any>((resolve, reject) => {
      this.genre = this.router.url.split("/")[this.router.url.split("/").length - 2];
      this.id = this.router.url.split("/")[this.router.url.split("/").length - 1];

      this.af.collection(this.genre).doc(this.id)
        .valueChanges()
        .subscribe(novel  => resolve(novel));
    });
  }

  getNovel(genre : string, id : string){
    return new Promise<any>((resolve, reject) => {
      this.af.doc(`/${genre}/${id}`)
      .valueChanges()
      .pipe(
        take(1)
      )
      .toPromise()
      .then(novel => resolve(novel))
      .catch(error => reject(error));
    });
  }
}
