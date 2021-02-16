import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }

  public updates = [
    {
      title: "Kobayashi-san chi no maid dragon",
      description: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
      cover: "https://m.media-amazon.com/images/I/51qv2IdWLzL.jpg",
      url: "client/novelas/mhThkaJhDuQ348HtMB5v/5"
    },
    {
      title: "Kobayashi-san chi no maid dragon",
      description: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
      cover: "https://m.media-amazon.com/images/I/51qv2IdWLzL.jpg",
      url: "client/novelas/mhThkaJhDuQ348HtMB5v/5"
    },
    {
      title: "Kobayashi-san chi no maid dragon",
      description: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
      cover: "https://m.media-amazon.com/images/I/51qv2IdWLzL.jpg",
      url: "client/novelas/mhThkaJhDuQ348HtMB5v/5"
    },
    {
      title: "Kobayashi-san chi no maid dragon",
      description: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
      cover: "https://m.media-amazon.com/images/I/51qv2IdWLzL.jpg",
      url: "client/novelas/mhThkaJhDuQ348HtMB5v/5"
    },
    {
      title: "Kobayashi-san chi no maid dragon",
      description: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
      cover: "https://m.media-amazon.com/images/I/51qv2IdWLzL.jpg",
      url: "client/novelas/mhThkaJhDuQ348HtMB5v/5"
    }
  ]

  ngOnInit(): void {
  }

}
