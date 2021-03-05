import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TableDataService } from './table-data.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private tds: TableDataService
  ) {
    this.initializeTable();
  }

  // public item values for the component
  public title: Observable<string>;
  public headers: Observable<Array<string>>;
  public model: Observable<Array<string>>;

  // data that does change by user interaction
  public page: number;
  public pageData: Array<any>;
  public pageSize: number;
  public maxPage: number;

  // private item values for the management of the table
  private lowestId: number;
  private highestId: number;
  private data: Array<any> = [];

  initializeTable() {
    this.title = new Observable(subscriber => {
      this.tds.title$.subscribe(title => { subscriber.next(title) });
    });
    this.headers = new Observable(subscriber => {
      this.tds.headers$.subscribe(headers => subscriber.next(headers));
    });
    this.model = new Observable(subscriber => {
      this.tds.model$.subscribe(model => subscriber.next(model));
    });

    this.tds.table.subscribe(table => {
      this.initializeTableParameters();
    })
  }

  initializeTableParameters() {
    // public parameters
    this.page = 1;
    this.pageData = [];
    this.pageSize = 5;
    this.maxPage = 1;

    // private parameters
    this.lowestId = Infinity;
    this.highestId = 0;
    this.data = [];
  }

  getPage(forward: boolean) {
    return new Promise<any>((resolve, reject) => {
      // we are navigating to a next page
      if (forward) {
        let totalPages = this.data.length / this.pageSize || 0;
        // we are navigating to a next page which does contain the data
        if (totalPages == this.maxPage) {
          this.pageData = [];
          for(let record of this.data){
            if((record.id < this.lowestId) && (record.id > (this.lowestId - this.pageSize))){
              this.pageData.push(record);
            }
          }

          this.lowestId = this.pageData[this.pageData.length - 1].id;
          this.highestId = this.pageData[0].id;

          // we need to resolve the information to the component
          // ---------------------------------------------------
          resolve({
            pageData : this.pageData,
            page : this.page++,
            maxPage : this.maxPage
          })
        }
        // we are navigating to a next page which does not contain the data
        else {
          // we download the data
          this.downloadPage()
          .then((page : Array<any>) => {
            this.pageData = [];
            page.map(record => this.data.push(record));
            this.pageData = page;
            this.lowestId = this.pageData[this.pageData.length - 1].id;
            this.highestId = this.pageData[0].id;

            // don't forget to resolve the data to the component
            // -------------------------------------------------
            resolve({
              pageData : this.pageData,
              page : this.page++,
              maxPage : this.maxPage
            })
          })
        }
      }
      // we are navigating to a  previous page
      else {
        this.pageData = [];
        for(let record of this.data){
          if ((record.id > this.highestId) && (record.id <= (this.highestId + this.pageSize))) {
            this.pageData.push(record);
          }
        }
        this.lowestId = this.pageData[this.pageData.length - 1].id;
        this.highestId = this.pageData[0].id;

        // resolve the data once is ready
        // ------------------------------
        resolve({
          pageData : this.pageData,
          page : this.page--,
          maxPage : this.maxPage
        })
      }
    });
  }

  downloadPage() {
    return new Promise<any>(async(resolve, reject) => {
      let title : string;
      await this.title.pipe(take(1)).toPromise().then(data => title = data);

      this.tds.getData(title, this.lowestId, this.pageSize)
      .then(page => {
        if(this.lowestId == Infinity){
          this.calculateMaxPage(page[0].id);
        }
        resolve(page)
      })
      .catch(error => reject(error));
    });
  }

  calculateMaxPage(highestId: number) {
    this.maxPage = Math.ceil(highestId / this.pageSize);
  }
}
