import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { novelTitles } from '../../models/novel.model';
import { requestModel, requestTitles } from '../../models/request.model';
import { staffModel, staffTitles } from '../../models/staff.model';
import { userModel, userTitles } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private router : Router
  ){
    this.getTable();
  }

  public table : Observable<string>;
  public title : string;
  public headers : Array<string>;
  public model : Array<string>;


  getTable(){
    this.table = new Observable(subscriber => {
      this.router.events.subscribe(event => {
        if(event instanceof NavigationEnd){
          let table = this.setTable(event.url);
          subscriber.next(table);
        }
      })
    });
  }

  setTable(url : string) : string{
    let table = url.split("/")[url.split("/").length - 1];
    this.title = table;
    this.setHeaders(table);
    this.setModel(table);
    return table;
  }

  setHeaders(table : string){
    switch(table){
      case "inicio":
        
      break;
      case "usuarios":
        this.headers = userTitles;
      break;
      case "solicitudes":
        this.headers = requestTitles;
      break;
      case "staff":
        this.headers = staffTitles;
      break;
      default:
        this.headers = novelTitles;
      break;
    } 
  }

  setModel(table : string){
    switch(table){
      case "inicio":

      break;
      case "usuarios":
        this.model = userModel;
      break;
      case "solicitudes":
        this.model = requestModel;
      break;
      case "staff":
        this.model = staffModel;
      break;
      default:

      break;
    } 
  }
}
