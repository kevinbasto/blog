import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }

  @Input() headers : Array<string>;
  @Input() model : Array<string>;
  @Input() data : Array<any>;
  @Input() page : number;
  @Input() maxPage : number;
  @Output() create = new EventEmitter();
  @Output() nextPage = new EventEmitter();


  ngOnInit(): void {
  }

}
