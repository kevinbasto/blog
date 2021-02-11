import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // constructor
  constructor() { }

  public title : string = "Funadas no fansub";
  public menu : Array<string> = [
    "Inicio",
    "Originales",
    "Chinas",
    "Japonesas",
    "coreanas"
  ];

  ngOnInit(): void {
  }

}
