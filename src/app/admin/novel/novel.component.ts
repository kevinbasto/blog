import { Component, OnInit } from '@angular/core';
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
    private ns : NovelService
  ) { }

  public novel : string;
  

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
      console.log(novel);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
