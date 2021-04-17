import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoverService {

  constructor(
    private af : AngularFirestore
  ) { }

  getTitle(url: string) : string{
    let title : string = "";
    let tokens = url.split("/");
    title = tokens[2];
    title = title.toUpperCase();
    return title;
  }

  async getCover() : Promise<string>{
    let cover : string;
    await this.af.doc("/info/cover")
    .valueChanges()
    .pipe(take(1))
    .toPromise()
    .then( (res : any) => {
      cover = res.cover;
    });

    return cover;
  }
}
