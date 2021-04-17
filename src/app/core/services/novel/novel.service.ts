import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { finalize, map, take } from 'rxjs/operators';
import { Novel } from '../../interfaces/novel';

@Injectable({
  providedIn: 'root'
})
export class NovelService {

  constructor(
    private router: Router,
    private af: AngularFirestore,
    private as: AngularFireStorage
  ) { }

  public genre: string;
  public id: string;

  /**
   * 
   * @returns 
   */
  getNovelData() {
    return new Promise<any>((resolve, reject) => {
      this.genre = this.router.url.split("/")[this.router.url.split("/").length - 2];
      this.id = this.router.url.split("/")[this.router.url.split("/").length - 1];

      this.af.collection(this.genre).doc(this.id)
        .valueChanges()
        .subscribe(novel => resolve(novel));
    });
  }

  /**
   * A function to query the data from firestore
   * @param genre - the genre of the novel
   * @param id - the id of the novel
   * @returns - returns a novel object with all the data
   */
  getNovel(genre: string, id: string) {
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
  editNovel(content: any, collection: string, novel: string, file: File) {
    return new Promise<any>((resolve, reject) => {
      let ref = this.as.ref(`${collection}/${novel}/${file.name}`)
      let task = ref.put(file);
      
      task.snapshotChanges()
        .pipe( finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            console.log("image done to upload");
            content.cover = url;
            console.log(`/${collection}/${novel}`);
            this.af.doc(`/${collection}/${novel}`).update(content)
              .then( (res) => {
                resolve(res);
              })
              .catch(err => {
                reject(err);
              })
          })
        })
      ).subscribe();
    })
  }

  /**
   * 
   */
  create(genre : string, novel : any, cover : File) : Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.af.collection(genre)
      .add(novel)
      .then(res => {
        let id = res.id;
        let ref = this.as.ref(`${genre}/${id}/${cover.name}`);
        let task = ref.put(cover);

        task.snapshotChanges()
        .pipe(finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            console.log("image upload done");
            res.update({
              cover : url,
              url : `/${genre}/${id}`,
              chapters : 0,
              finished: false
            })
            .then(() => {
              this.af.collection(`/${genre}`, ref => ref.orderBy("id", "desc").limit(1))
              .valueChanges()
              .pipe(take(1))
              .toPromise()
              .then( (collection : any) => {
                let id;
                if(collection[0] == undefined){
                  id = 1;
                }else{
                  id = collection[0].id + 1
                }

                res.update({id : id})
                .then(answer => {
                  console.log(answer);
                  resolve(answer)
                })
                .catch(error => reject(error));
              })
            })
            .catch(error => reject(error));
          })
        }))
        .subscribe()
      })
    });
  }
}
