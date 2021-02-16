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
      title: "Tensei no shitara slime datta ken",
      description: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
      cover: "https://images-na.ssl-images-amazon.com/images/I/81ajhj8RqML._AC_SY879_.jpg",
      url: "client/novelas/mhThkaJhDuQ348HtMB5v/4"
    },
    {
      title: "Dragon Ball Z",
      description: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
      cover: "https://m.media-amazon.com/images/I/61nY1Y2nonL.jpg",
      url: "client/novelas/mhThkaJhDuQ348HtMB5v/3"
    },
    {
      title: "Otome Game no Hametsu Flag shika nai Akuyaku Reijou ni Tensei shite shimatta",
      description: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
      cover: "https://otakuteca.com/images/books/cover/5cb938a29c423.jpg",
      url: "client/novelas/mhThkaJhDuQ348HtMB5v/2"
    },
    {
      title: "Kobayashi-san chi no maid dragon",
      description: "lorem ipsum dolor sit amet, consectetur adipisicing elit",
      cover: "https://m.media-amazon.com/images/I/51qv2IdWLzL.jpg",
      url: "client/novelas/mhThkaJhDuQ348HtMB5v/1"
    }
  ]

  ngOnInit(): void {
  }

}
