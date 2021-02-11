import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  // constructor
  constructor() { }

  @Input() menu : any;
  @Output() closed = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  alternate(){
    this.closed.emit(false);
  }

}
