import { Component, OnInit, Input } from '@angular/core';
import { TableService } from 'src/app/core/services/table/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(
    private table : TableService
  ) { }

  @Input() collection : string;

  ngOnInit(): void {
  }
}
