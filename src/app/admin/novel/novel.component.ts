import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NovelService } from 'src/app/core/services/novel/novel.service';

@Component({
  selector: 'app-novel',
  templateUrl: './novel.component.html',
  styleUrls: ['./novel.component.css']
})
export class NovelComponent implements OnInit {

  constructor(
    private router : Router,
    private ns : NovelService,
    private fb : FormBuilder
  ) { }

  public novel : string;
  public content : any;
  public novelForm : FormGroup

  ngOnInit(): void {
    this.getRoute();
  }

  getRoute(){
    let genre = this.router.url.split("/")[this.router.url.split("/").length - 3];
    let novel = this.router.url.split("/")[this.router.url.split("/").length - 1];
    if(novel == "new"){
      this.createNovel();
    }else{
      this.getNovel(genre, novel);
    }
  }

  createNovel(){
    this.novel = "Crear Novela";
  }

  getNovel(genre : string, novel : string){
    this.ns.getNovel(genre, novel)
    .then(novel => {
      this.content = novel;
    })
    .catch(error => {
      console.log(error);
    });
  }
}
