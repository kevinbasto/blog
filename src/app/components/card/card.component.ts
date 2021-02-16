import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  @Input() title : string;
  @Input() description : string;
  @Input() cover : string;
  @Input() url : string;

  public coverUrl : string = "https://m.media-amazon.com/images/I/51qv2IdWLzL.jpg";

  ngOnInit(): void {
  }

}
