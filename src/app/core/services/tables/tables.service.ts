import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { novelModel, novelTitles } from '../../models/novel.model';
import { userModel, userTitles } from '../../models/user.model';
import { staffModel, staffTitles } from '../../models/staff.model';
import { requestModel, requestTitles } from '../../models/request.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(
    private router : Router,
    private af : AngularFirestore
  ) { 
    this.setTable();
  }

  public table$ : Observable<string>

  setTable(){
    this.table$ = new Observable<string>(subscriber => {
      this.router.events.subscribe(event => {
        if(event instanceof NavigationEnd){
          let routeEnd = event.url.split("/")[event.url.split("/").length - 1];
          subscriber.next(routeEnd);
        }
      });
    });
  }

  getModel(table : string): Promise<any>{
    return new Promise((resolve, reject) => {
      switch(table){
        case "usuarios":
          resolve(userModel);
          break;
        case "staff":
          resolve(staffModel);
          break;
        case "solicitudes":
          resolve(requestModel);
          break;
        default:
          resolve(novelModel);
          break;
      }
    });
  }

  getHeaders(table : string) : Promise<any>{
    return new Promise((resolve, reject) => {
      switch(table){
        case "usuarios":
          resolve(userTitles);
          break;
        case "staff":
          resolve(staffTitles);
          break;
        case "solicitudes":
          resolve(requestTitles);
          break;
        default:
          resolve(novelTitles);
          break;
      }
    })
  }

  getDataPage(table : string, lowestId : number, pageSize : number) : Promise<any>{
    return new Promise<any>((resolve, reject) => {
      if(table != "staff"){
        this.af.collection(table, ref => 
          ref.limit(pageSize)
          .where("id", "<", lowestId)
          .orderBy("id", "desc")
        ).valueChanges()
        .subscribe(response => {
          resolve(response);
        })
      }
    });
  }
  
}
