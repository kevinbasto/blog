import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments-box',
  templateUrl: './comments-box.component.html',
  styleUrls: ['./comments-box.component.css']
})
export class CommentsBoxComponent implements OnInit {

  constructor() { }

  public comments : Array<any> = [
    {
      username: "Dávalos",
      picture: "https://mgl.skyrock.net/art/SHAR.8041.456.2.jpg",
      content: "Esta novela está hermosa <3"
    },
    {
      username: "Time7aker",
      picture: "https://i.pinimg.com/originals/b1/44/be/b144be8dbedfaff32a380b9feff234c6.jpg",
      content: "Sube más del autor!"
    },
    {
      username: "jona",
      picture: "https://i.pinimg.com/originals/e0/76/cd/e076cda4ac938cfa5e52c39ee8cf62fa.jpg",
      content: "Si no supiste amar, ahora te puedes marchar"
    }
  ];

  ngOnInit(): void {
  }

}
