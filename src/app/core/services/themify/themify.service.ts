import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

const themeMap : { [key : string] : string } = {
  dark : "light",
  light: "beige",
  beige: "dark"
}

@Injectable({
  providedIn: 'root'
})
export class ThemifyService {

  // public current : Observable<string>;
  public theme : string;
  public bodyClass : any;  

  constructor() {
    this.getCurrentTheme();
   }

  getCurrentTheme(){
    this.theme = localStorage.getItem("theme")!;

    if(!this.theme){
      this.theme = Object.keys(themeMap)[0];
      localStorage.setItem("theme", this.theme);
    }
    
    this.bodyClass = document.body.classList;
    this.bodyClass.add(this.theme);
  }

  changeTheme(){
    let current : string = this.theme!;
    let next = themeMap[current];
    this.bodyClass.replace(current, next);
    this.theme = next;
    localStorage.setItem('theme', next); 
  }
  
}
