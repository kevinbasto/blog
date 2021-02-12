import { Component, OnInit } from '@angular/core';

// client and admin menu import
import { MenuOption } from '../../core/menu.option';
import { ClientMenu } from '../../core/client.menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // constructor
  constructor() { }

  public title : string = "Funadas no fansub";
  public menu : Array<MenuOption> = ClientMenu;
  public displayed : boolean = false;

  ngOnInit(): void {
  }

  toggleSidebar(){
    this.displayed = !this.displayed;
  }

}
