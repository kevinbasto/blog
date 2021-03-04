import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TablesComponent } from 'src/app/admin/tables/tables.component';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(
    private router : Router
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
}
