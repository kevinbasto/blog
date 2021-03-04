import { Component, OnInit } from '@angular/core';

// client and admin menu import
import { MenuOption } from '../../core/menu.option';
import { ClientMenu } from '../../core/client.menu';
import { SidebarService } from 'src/app/core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // constructor
  constructor(
    private sidebar: SidebarService
  ) {
    
  }

  public title : string = "Funadas no fansub";
  public menu : Array<MenuOption>;
  public displayed : boolean = false;

  ngOnInit(): void {
    this.getSidebarMenu();
  }

  toggleSidebar(){
    this.displayed = !this.displayed;
  }

  getSidebarMenu(){
    this.menu = this.sidebar.menu;
  }
}
