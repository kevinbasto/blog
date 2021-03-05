import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableDataService } from './table-data.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private tds : TableDataService
  ) { 
    this.initializeTable();
  }

  // public item values for the component
  public title : Observable<string>;
  public headers : Observable<Array<string>>;
  public model : Observable<Array<string>>;
  public page : Observable<number>;
  public pageData : Observable<Array<any>>;
  public pageSize : Observable<number>;

  // private item values for the management of the table
  private maxPage : number;
  private lowestId : number;
  private highestId : number;

  initializeTable(){
    this.title = new Observable(subscriber => {
      this.tds.title$.subscribe(title => {subscriber.next(title)});
    });
    this.headers = new Observable(subscriber => {
      this.tds.headers$.subscribe(headers => subscriber.next(headers));
    });
    this.model = new Observable(subscriber => {
      this.tds.model$.subscribe(model => subscriber.next(model));
    });

  }

}
