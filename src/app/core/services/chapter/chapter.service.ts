import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
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
      localStorage.setItem("currentNovel", this.novel);
      localStorage.setItem("chapters", novel.chapters.toString());
      localStorage.setItem("currentchapter", this.chapter);
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
}
