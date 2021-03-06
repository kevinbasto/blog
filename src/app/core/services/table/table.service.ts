import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
    private af: AngularFirestore
  ) { }

  

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
    this.page = 0;
    this.data = [];
    this.lowestId = Infinity;
    this.highestId = 0;
    this.pageSize = 5;
  }

  // functions for handling the information in the tables
  getPageData(forward: boolean) {
    return new Promise<any>(async (resolve, reject) => {
      if (forward) {
        this.page++;
        await this.next();
        resolve(true);
      }
      else {
        this.page--;
        this.previous();
        resolve(false);
      }
    });
  }

  async next() {
    console.log(this.lowestId);
  }

  previous(){
    console.log(this.highestId);
  }
}
