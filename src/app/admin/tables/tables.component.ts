import { Component, OnInit } from '@angular/core';
import { TablesService } from 'src/app/core/services/tables/tables.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor( ) { }

  // data to export to the table
  public title: string;
  public headers : Array<string>;
  public model : Array<string>;
  public pageData : Array<any>;
  public data : Array<any>;
  public lowestId : number;
  public pageSize : number;
  public page : number;

  ngOnInit(): void {
  }

}
