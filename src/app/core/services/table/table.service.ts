import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private ds : DataService) { }

  public collection : string;

  // this sets the source of the data for the data service
  setCollection(collection : string){
    this.collection = collection;
  }

}