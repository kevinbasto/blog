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
    this.initializeTable();
   }

  public title : string;
  public headers: Array<string>;
  public model : Array<string>;
  public data : Array<any>;
  public page : number;
  public maxPage : number;

  ngOnInit(): void { }

  initializeTable(){
    this.ts.title.subscribe(title => this.title = title);
    this.ts.headers.subscribe(headers => this.headers = headers);
    this.ts.model.subscribe(model => this.model = model);
    this.getData(true);
  }

  getData(forward : boolean){
    this.ts.getPage(forward)
    .then(data => {
      this.data = data.pageData;
      this.page = data.page;
      this.maxPage = data.maxPage;
    })
  }

  next(){
    this.getData(true);
  }

  previous(){
    this.getData(false)
  }
  
}