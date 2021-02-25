import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ClientMenu } from '../../client.menu';
import { AdminMenu } from '../../admin.menu';
import { MenuOption } from '../../menu.option';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(
    private router: Router
  ) {
    this.getRouteTree();
  }

  public routeTree: Array<string>;
  public clientMenu = ClientMenu;
  public adminMenu = AdminMenu;
  public menu : Array<MenuOption>;

  getRouteTree() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routeTree = event.url.split("/").filter(token => {
          if (token != "")
            return token;
        });
        this.menu = this.getSidebarMenu();
      }
    })

  }

  getSidebarMenu(): Array<MenuOption> {
    if(this.routeTree[0] == "client"){
      return this.clientMenu;
    }else{
      return this.adminMenu;
    }
  }

}
