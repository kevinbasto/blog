import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { title, headers, model, data} from './dummy.data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  constructor() { }

  /* @Input() headers : Array<string>;
  // @Input() model : Array<string>;
  // @Input() data : Array<any>;
  // @Input() page : number;
  // @Input() maxPage : number;
  // @Output() create = new EventEmitter();
  // @Output() nextPage = new EventEmitter();  */

  // all the input data of the component
  //this three will be on the final table
  public title : string;
  public headers : Array<string>;
  public model : Array<string>;
  public length : number = 4;

  // this data is processed
  public data : Array<any>;
  public page : number;
  
  // this is constant
  public maxPage : number;

  // all the table data management
  public currentPage : Array<any>;


  ngOnInit(): void {
    // this is for testing purposes, later on will be deleted
    this.setTestData();
    this.loadPage();
  }

  ngOnChanges(): void {

  }

  setTestData(){
    this.title = title;
    this.headers = headers;
    this.model = model;
    this.data = data;
    this.page = 1;
    this.maxPage = 5;
  }
 
  loadPage(){
    let pageSize = 5;
    this.currentPage = [];
    for(let i = 0; i < this.data.length; i++){
      if( (i+1 > (this.page - 1) * pageSize) && i < (this.page) * pageSize )
        this.currentPage.push(this.data[i]);
    }
  }

  nextPage(){
    this.page++;
    this.loadPage();
  }

  previousPage(){
    this.page--;
    this.loadPage();
  }
}
