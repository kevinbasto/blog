import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }

  // all the input data of the component
  //this three will be on the final table
  @Input() public title : string;
  @Input() public headers : Array<string>;
  @Input() public model : Array<string>;
  @Input() public data : Array<any>;

  ngOnInit(): void {
    
  }
  
}
