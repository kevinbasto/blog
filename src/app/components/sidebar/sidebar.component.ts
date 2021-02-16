import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ThemifyService } from '../../core/services/themify/themify.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  // constructor
  constructor(
    private themify : ThemifyService
  ) { }

  @Input() title : any;
  @Input() menu : any;
  @Output() closed = new EventEmitter<boolean>();
  public theme : string = this.themify.theme;

  ngOnInit(): void {
  }

  alternate(){
    this.closed.emit(false);
  }

  changeTheme(){
    this.themify.changeTheme();
    this.theme = this.themify.theme;
  }

}
