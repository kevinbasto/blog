import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  public genre : string;
  public novel : string;
  public chapter : string;

  ngOnInit(): void {
    this.getUrlTree();
  }

  getUrlTree() {
    this.genre   = this.url.split("/")[this.url.split("/").length - 3];
    this.novel   = this.url.split("/")[this.url.split("/").length - 2];
    this.chapter = this.url.split("/")[this.url.split("/").length - 1];
  }

  get url(){
    return this.router.url;
  }
}
