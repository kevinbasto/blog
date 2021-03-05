import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { novelModel, novelTitles } from '../../models/novel.model';
import { requestModel, requestTitles } from '../../models/request.model';
import { staffModel, staffTitles } from '../../models/staff.model';
import { userModel, userTitles } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  constructor(
    private router : Router,
    private af: AngularFirestore
  ) { }
  public table : Observable<string> = new Observable(subscriber => {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        let table : string = event.url.split("/")[event.url.split("/").length - 1];
        subscriber.next(table);
      }
    })
  });

  public title$ : Observable<string> = new Observable(subscriber => {
    this.table.subscribe(table => {
      subscriber.next(table);
    })
  });

  public headers$ : Observable<Array<any>> = new Observable(subscriber => {
    this.table.subscribe(table => {
      let headers = this.setHeaders(table);
      subscriber.next(headers);
    });
  });

  public model$ : Observable<Array<any>> = new Observable(subscriber => {
    this.table.subscribe(table => {
      let model = this.setModel(table);
      subscriber.next(model);
    });
  });

  setHeaders(table : string){
    switch(table){
      case "usuarios":
        return userTitles;
      case "staff":
        return staffTitles;
      case "solicitudes":
        return requestTitles
      default:
        return novelTitles;
    }
  }

  setModel(table: string){
    switch(table){
      case "usuarios":
        return userModel;
      case "staff":
        return staffModel;
      case "solicitudes":
        return requestModel;
      default:
        return novelModel 
    }
  }

  //for tables of NOT specific querys such as terminated or staff
  getData(table : string, lowestId : number, pageSize: number){
    return new Promise<any>((resolve, reject) => {
      this.af.collection(table, ref => 
        ref.limit(pageSize)
        .where("id", "<", lowestId)
        .orderBy("id", "desc")  
      ).valueChanges()
      .subscribe(collection => {
        if(collection){
          resolve(collection);
        }else{
          reject("Hubo un problema al recuperar los datos");
        }
      })
    });
  }
}
