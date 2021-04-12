import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Chapter } from '../../interfaces/chapter';
import { Novel } from '../../interfaces/novel';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(
    private af : AngularFirestore,
    private router: Router
  ) { 
    this.getRouteNodes();
  }

  public genre : string;
  public novel : string;
  public chapter: string;
  public totalChapters : number;

  getRouteNodes(){
    let nodes : Array<string>;
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        nodes = event.url.split("/").filter(node => {
          if(node != "" && node != "client"){
            return node;
          }
        })

        this.genre = nodes[0];
        this.novel = nodes[1];
        this.chapter = nodes[2];

        this.setCurrentReading();
      }
    });
  }

  setCurrentReading(){
    this.af
    .collection(this.genre)
    .doc(this.novel)
    .valueChanges()
    .subscribe((novel : any) => {
      if(novel)
        this.totalChapters = novel.chapters;
    })
  }

  getChapter(){
     return new Promise<any>((resolve, reject) => {
       this.af
       .collection(this.genre)
       .doc(this.novel)
       .collection("chapters")
       .doc(this.chapter)
       .valueChanges()
       .subscribe(chapter => {  
         if(chapter)
          resolve(chapter);
         else
          reject("lo sentimos, no existe el capítulo :(");
       })
     });
  }

  getAdminChapter(genre : string, novel : string, chapter : string) {
    return new Promise<any>((resolve, reject) => {
      this.af
      .collection(genre)
      .doc(novel)
      .collection("chapters")
      .doc(chapter)
      .valueChanges()
      .subscribe(chapter => {  
        if(chapter)
         resolve(chapter);
        else
         reject("lo sentimos, no existe el capítulo :(");
      })
    });
  }

  updteChapter(
    genre : string, 
    novel : string, 
    chapter : string, 
    content : Array<string>, 
    authors : Array<string>) 
    : Promise<any> 
  {
    return new Promise<any>( async(resolve, reject) => {
      let update = {
        content : content, 
        translators : authors
      }
      await this.af.doc(`/${genre}/${novel}/chapters/${chapter}`)      
      .update(update)
      .then(res => {
        resolve({ status : "success" })
      })
      .catch(error => reject(error));
    });
  }

  saveNew(genre : string, novel : string, chapter : any) : Promise<any>{
    return new Promise<any>(async(resolve, reject) => {
      let id : number;
      await this.af.collection(`/${genre}/${novel}/chapters`, ref => ref.orderBy("id", "desc").limit(1))
      .valueChanges()
      .pipe(take(1))
      .toPromise()
      .then( (doc : any) => {
        let docId;
        if(doc[0]){
          docId = doc[0].id;
        }

        if(docId != undefined)
          id = docId + 1;
        else
          id = 1;
      })
      chapter.id = id;
      await this.af.doc(`/${genre}/${novel}`)
      .update({
        chapters : chapter.id
      })
      chapter.url = `/${genre}/${novel}/${chapter.id}`
      await this.af.doc(`/${genre}/${novel}/chapters/${chapter.id}`)
      .set(chapter)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
    })
  }
}
