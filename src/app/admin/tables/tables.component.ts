import { Component, OnInit } from '@angular/core';
import { TablesService } from 'src/app/core/services/tables/tables.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(
    private ts : TablesService
  ) { 
    this.getTable();
  }

  // data to export to the table
  public title: string;
  public headers : Array<String>;
  public model : Array<string>;
  public data : Array<any>;

  ngOnInit(): void {
  }

  getTable(){
    this.ts.table$.subscribe(table => {
      this.title = table
      
    });
  }
}
