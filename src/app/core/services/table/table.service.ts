import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { novelModel, novelTitles } from '../../models/novel.model';
import { requestModel, requestTitles } from '../../models/request.model';
import { staffModel, staffTitles } from '../../models/staff.model';
import { updatesModel, updatesTitles } from '../../models/updates.model';
import { userModel, userTitles } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private router: Router,
    private af: AngularFirestore
  ) {
    this.getTable();
  }

  // observable
  public table: Observable<string>;

  //data for the table
  public title: string;
  public headers: Array<string>;
  public model: Array<string>;

  //page navigation
  public data: Array<any>;
  public pageData: Array<any>;
  public pageSize: number;
  public page: number;
  public maxPage: number;
  public lowestId: number;
  public highestId: number;



  getTable() {
    this.table = new Observable(subscriber => {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          let table = this.setTable(event.url);
          subscriber.next(table);
        }
      })
    });
  }

  setTable(url: string): string {
    let table = url.split("/")[url.split("/").length - 1];
    this.title = table;
    this.setHeaders(table);
    this.setModel(table);
    // this value is prefixed due to the change of tables implies
    // deleting the data in the buffer and downloading the new data
    this.setInitialParameters();
    return table;
  }

  setHeaders(table: string) {
    switch (table) {
      case "updates":
        this.headers = updatesTitles;
        break;
      case "users":
        this.headers = userTitles;
        break;
      case "requests":
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

  setModel(table: string) {
    switch (table) {
      case "updates":
        this.model = updatesModel;
        break;
      case "users":
        this.model = userModel;
        break;
      case "requests":
        this.model = requestModel;
        break;
      case "staff":
        this.model = staffModel;
        break;
      default:
        this.model = novelModel
        break;
    }
  }

  setInitialParameters() {
    this.page = 1;
    this.data = [];
    this.lowestId = Infinity;
    this.highestId = 0;
    this.pageSize = 5;
  }

  getPageData(forward: boolean) {
    return new Promise<any>(async (resolve, reject) => {
      if (forward) {
        await this.next();
        resolve(true);
      }
      else {
        this.previous();
        resolve(false);
      }
    });
  }

  async next() {
    // if maxpage is not defined then it's a new reload;
    if (!this.maxPage) {
      await this.download()
      .then((page : Array<any>) => {
        this.bufferData(page);
      })
      return;
    }

    // the buffer is not empty, hence there's data in it
    let totalPages = this.data.length / this.pageSize;
    if(totalPages == this.maxPage){
      // the buffer does contain the next page
      this.pageData = [];
      for (let record of this.data) {
        if ((record.id < this.lowestId) && (record.id > (this.lowestId - this.pageSize))) {
          this.pageData.push(record);
        }
      }
      console.log(this.setParams);
      this.setParams();
    }
    else{
      // the buffer does not contain the page
      await this.download()
          .then((collection : Array<any>) => {
            this.pageData = [];
            collection.map(update => this.data.push(update))
            this.pageData = collection;
            this.setParams();
          })
    }
  }

  bufferData(page : Array<any>){
    page.map(record => this.data.push(record));
    this.pageData = page;
    this.setParams();
  }

  setParams(){
    this.lowestId = this.pageData[this.pageData.length - 1].id;
    this.highestId = this.pageData[0].id;
  }

  previous() {
    this.pageData = [];
    for (let record of this.data) {
      if ((record.id > this.highestId) && (record.id <= (this.highestId + this.pageSize))) {
        this.pageData.push(record);
      }
    }
    this.setParams();
  }

  download() {
    return new Promise<any>((resolve, reject) => {
      this.af.collection(this.title, ref =>
        ref.limit(this.pageSize)
          .where("id", "<", this.lowestId)
          .orderBy("id", "desc"))
        .valueChanges()
        .subscribe(page => {
          resolve(page);
        })
    })
  }
}
