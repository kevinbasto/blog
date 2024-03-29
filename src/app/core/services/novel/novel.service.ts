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
   * @param genre - the collection in which the novel is stored
   * @param novel - the novel in where is going to be placed the new data
   * @returns 
   */
  editNovel(content: any, genre: string, novel: string, cover: File) {
    return new Promise<any>(async(resolve, reject) => {
      if(!cover){
        console.log(`/${genre}/${novel}`)
        return this.af.doc(`/${genre}/${novel}`).update(content)
        .then(res => resolve(res))
        .catch(error => reject(error));
      }
      let coverUrl = await this.uploadCover(genre, novel, cover);
      content.cover = coverUrl;
      this.af.doc(`/${genre}/${novel}`).update(content)
      .then(res => resolve(res))
      .catch(error => reject(error));
    });
  }

  async create(genre: string, novel: any, cover: File): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      if (!cover)
        return reject("Necesitas subir la portada de la novela!");
      novel.id = await this.getLastId(genre);
      await this.upload(genre, novel, cover)
        .then(res => resolve(res))
        .catch(error => reject(error));
    });
  }

  private async getLastId(genre: string): Promise<any> {
    let id: number;
    id = await this.af.collection(genre, ref => ref.orderBy('id', 'desc').limit(1))
      .valueChanges().pipe(take(1))
      .toPromise()
      .then((res: Array<any>) => {
        return res[0] ? res[0].id + 1 : 1;
      })
      .catch(error => { throw error });
    return id;
  }

  private async upload(genre: string, novel: any, cover: File): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      let id: string;
      await this.af.collection(genre).add(novel)
        .then((res: any) => { id = res.id })
        .catch(error => reject(error));
      let coverUrl = await this.uploadCover(genre, id, cover);
      novel = {
        chapters: 0,
        cover: coverUrl,
        status: "En emisión",
        url: `/${genre}/${id}`,
        ...novel
      };
      console.log(novel);
      this.af.doc(`/${genre}/${id}`).update(novel)
        .then(res => resolve(res))
        .catch(error => reject(error));
    })
  }

  private async uploadCover(genre: string, id: string, cover: File): Promise<string> {
    return new Promise<any>(async (resolve, reject) => {
      let ref = this.as.ref(`${genre}/${id}/${cover.name}`);
      let task = ref.put(cover);
      let coverUrl;
      await task.snapshotChanges()
        .pipe(finalize(() => {
          ref.getDownloadURL().pipe(take(1)).toPromise()
            .then(url => resolve(url));
        })).toPromise();
    })
  }
}

/**
  return new Promise<any>((resolve, reject) => {
      let ref = this.as.ref(`${collection}/${novel}/${file.name}`)
      let task = ref.put(file);

      task.snapshotChanges()
        .pipe(finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            content.cover = url;
            this.af.doc(`/${collection}/${novel}`).update(content)
              .then((res) => {
                resolve(res);
              })
              .catch(err => {
                reject(err);
              })
          })
        })
        ).subscribe();
    })
 */