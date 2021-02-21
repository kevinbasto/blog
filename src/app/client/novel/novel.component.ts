import { Component, OnInit } from '@angular/core';
import { Novel } from 'src/app/core/interfaces/novel';
import { NovelService } from 'src/app/core/services/novel/novel.service';


@Component({
  selector: 'app-novel',
  templateUrl: './novel.component.html',
  styleUrls: ['./novel.component.css']
})
export class NovelComponent implements OnInit {

  constructor(
    private ns : NovelService
  ) { }

  public novel : Novel
  public chapters : Array<any>;

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.ns.getNovelData()
    .then((novel : Novel) => {
      this.novel = novel;
      this.setChaptersBox();
    })
    .catch(error => console.error(error));
  }

  setChaptersBox(){
    this.chapters = [];
    for(let i = 1; i <= this.novel.chapters; i++){
      this.chapters.push({
        number: i,
        url: `/client/${this.ns.genre}/${this.ns.id}/${i}`
      });
    }    
  }
}
