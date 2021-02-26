import { Component, OnInit } from '@angular/core';
import { MenuOption } from 'src/app/core/menu.option';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  public headers : Array<string>;
  public model :  Array<string>;
  public data : Array<any>;
  public page : number;
  public maxPage : number;

  ngOnInit(): void { }

  

}
