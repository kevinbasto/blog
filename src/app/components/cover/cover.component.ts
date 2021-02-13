import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  constructor(
    
  ) { }

  public coverUrl : string = "https://cdn.wallpapersafari.com/7/69/dxBmov.jpg";
  public title: string;

  ngOnInit(): void {
    this.setTitle();
  }

  setTitle(){

  }

}
