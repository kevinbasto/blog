import { Component, Input, OnInit } from '@angular/core';
import { TableService } from 'src/app/core/services/table/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(
    private ts : TableService
  ) {
    this.getTable();
  }

  public title : string;
  public headers : Array<string>;
  public model : Array<string>;
  public data : Array<any>;
  public page : number;

  ngOnInit(): void { }

  getTable(){
    this.ts.table.subscribe(table => {
      this.title = this.ts.title;
      this.headers = this.ts.headers;
      this.model = this.ts.model;
      this.page = this.ts.page;
      this.getData(true);
    })
  }

  previous(){
    this.page--;
    this.getData(false);
  }

  next(){
    this.page++;
    this.getData(true);
  }

  async getData(forward : boolean){
    this.ts.getPageData(forward)
    .then(value => {
      console.log(this.ts.pageData);
      this.data = this.ts.pageData;
    });
  }
}