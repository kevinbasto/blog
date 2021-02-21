import { Component, OnInit } from '@angular/core';
import { ChapterService } from 'src/app/core/services/chapter/chapter.service';
import { Chapter } from 'src/app/core/interfaces/chapter';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  constructor(
    private cs : ChapterService
  ) { }

  public chapter : Chapter;

  ngOnInit(): void {
    this.getChapter();
  }

  getChapter(){
    this.cs.getChapter()
    .then((chapter : Chapter) => {
      this.chapter = chapter;
      console.log(chapter);
    })
    .catch(error => {
      console.log(error);
    })
  }
}
