import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  public coverUrl : string = "https://m.media-amazon.com/images/I/51qv2IdWLzL.jpg";

  ngOnInit(): void {
  }

}
