import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private ds: DataService) { }

  public collection: string;

  // the pool of data from which the service pull previously queried data
  public data: Array<any> = [];
  public maxPage: number = 0;

  // this sets the source of the data for the data service
  setCollection(collection: string) {
    this.collection = collection;
  }

  getData(page: number, pageSize: number) {
    return new Promise<any>(async (resolve, reject) => {
      // if data length is zero, then it's empty so we download the first page
      if (this.data.length == 0) {
        await this.download(Infinity, pageSize)
        .then(collection => {
          resolve(collection);
        })
        .catch(error => {
          reject(error);
        })
      }

      // if not then check for the existance of the page
      let pages = Math.ceil(this.data.length / pageSize);
      
      if(page <= pages){
        let collection = [];
        for(let i = 0; i < this.data.length; i++){
          if( (i >= ((page * pageSize)  - pageSize)) && (i < (page * pageSize) ) ){
            collection.push(this.data[i]);
          }
        }
        resolve(collection);
      }else{
        if(this.data.length == 0)
          return
        let lowestId = this.data[this.data.length - 1].id;
        await this.download(lowestId, pageSize)
        .then(collection => {
          resolve(collection);
        })
        .catch(error => {
          reject(error);
        })
      }
    });
  }

  download(lowestId : number, pageSize : number) {
    return new Promise<any>((resolve, reject) => {
      this.ds.getFromCollection(this.collection, lowestId, pageSize)
      .then((collection : Array<any>) => {
        collection.map(record => this.data.push(record));
        resolve(collection);
      })
      .catch(error => {
        reject(error);
      })
    });
  }

}