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

  /**
   * A function to query the data from firestore
   * @param genre - the genre of the novel
   * @param id - the id of the novel
   * @returns - returns a novel object with all the data
   */
  getNovel(genre : string, id : string){
    return new Promise<any>((resolve, reject) => {
      this.af.doc(`/${genre}/${id}`)
      .valueChanges()
      .pipe(
        take(1)
      )
      .toPromise()
      .then(novel => {
        resolve(novel);
      })
      .catch(error => reject(error));
    });
  }

  /**
   * a function to update any changes in the novel
   * @param content - the content changed in the novel
   * @param collection - the collection in which the novel is stored
   * @param novel - the novel in where is going to be placed the new data
   * @returns 
   */
  editNovel(content : any, collection : string, novel : string) {
    return new Promise<any>((resolve, reject) => {
      this.af.doc(`/${collection}/${novel}`).set(content)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    })

  }
}
