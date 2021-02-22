import { Component, OnInit } from '@angular/core';
import { ChapterService } from 'src/app/core/services/chapter/chapter.service';
import { Chapter } from 'src/app/core/interfaces/chapter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  constructor(
    private cs : ChapterService,
    private router: Router
  ) { }

  public chapter : Chapter;
  public chapterCount: number;
  public totalChapters: number;

  ngOnInit(): void {
    this.getChapter();
  }

  getChapter(){
    this.cs.getChapter()
    .then((chapter : Chapter) => {
      this.chapter = chapter;
      this.chapterCount = parseInt(this.cs.chapter);
      this.totalChapters = this.cs.totalChapters;
    })
    .catch(error => {
      console.log(error);
    })
  }

  navigateToPrevious(){
    this.router.navigate([`/client/${this.cs.genre}/${this.cs.novel}/${this.chapterCount - 1}`])
    .then(() => {
      this.getChapter()
    })
  }
  navigateToNext(){
    this.router.navigate([`/client/${this.cs.genre}/${this.cs.novel}/${this.chapterCount + 1}`])
    .then(() => {
      this.getChapter()
    })
  }
}
