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
  public data : Array<string>;
  public page : number;

  ngOnInit(): void { }

  initializeTable(){
    this.ts.title.subscribe(title => this.title = title);
    this.ts.headers.subscribe(headers => this.headers = headers);
    this.ts.model.subscribe(model => this.model = model);
  }
  
}