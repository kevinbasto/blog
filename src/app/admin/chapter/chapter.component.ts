import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ChapterService } from 'src/app/core/services/chapter/chapter.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  constructor(
    private router: Router,
    private fb : FormBuilder,
    private chapterService : ChapterService
  ) { }

  public chapterForm : FormGroup;
  public genre : string;
  public novel : string;
  public chapter : string;
  public content : any;


  ngOnInit(): void {
    this.getUrlTree();
    this.initializeForm();
    this.getChapter();
  }

  getChapter() { 
    this.chapterService.getAdminChapter(this.genre, this.novel, this.chapter)
    .then(res => {
      this.content = res;
    })
    .catch(error => {
      console.log(error);
    })
  }

  initializeForm() {
    this.chapterForm = this.fb.group({
      
    })
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
