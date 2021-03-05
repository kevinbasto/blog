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

  ngOnInit(): void { }

  getTable(){
    this.ts.table.subscribe(table => {
      this.title = this.ts.title;
      this.headers = this.ts.headers;
      this.model = this.ts.model;
    })

  }
}