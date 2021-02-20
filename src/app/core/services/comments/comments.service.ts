import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { userInfo } from 'os';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private af : AngularFirestore,
    private auth : AuthService,
    private router: Router,
  ) { 
    this.getNovelRoute();
  }

  private genre : string;
  private novel : string;
  

  getNovelRoute(){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.parseRoute(event.url);
      }
    })
  }

  parseRoute(route : string){
    let nodes : Array<string> = route.split("/");
    nodes = nodes.filter(node => {
      if(node != "")
        return node;
    });
    this.genre = nodes[1];
    this.novel = nodes[2];
  }

  getComments(lowestId : number = 0){
    return new Promise<any>((resolve, reject) => {
      this.af
      .collection(this.genre)
      .doc(this.novel)
      .collection("comments", ref => ref.limit(5).where('id', '<', lowestId).orderBy('id','desc'))
      .valueChanges()
      .subscribe(comments => resolve(comments));
    });
  }

  async postComment(content: string){
    let user : any;
    await this.auth.user$
    .pipe(take(1))
    .toPromise()
    .then(userData => {
      user = userData;
    })
    let lastComment : any;
    await this.af
    .collection(this.genre)
    .doc(this.novel)
    .collection("comments", ref => ref.limit(1).orderBy('id', 'desc'))
    .valueChanges()
    .pipe(take(1))
    .toPromise()
    .then(comment => lastComment = comment);

    let id = lastComment[0].id + 1;

    return new Promise<any>((resolve, reject) => {
      this.af
      .collection(this.genre)
      .doc(this.novel)
      .collection("comments").add({
        id: id,
        username: user.username,
        picture: user.picture,
        content : content
      })
      .then(res => {
        resolve("comentario creado correctamente :D");
      })
      .catch(error => {
        reject("hubo un problema a la hora de comentar")
      })
    });
  }
}
