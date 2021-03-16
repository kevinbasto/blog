import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novels',
  templateUrl: './novels.component.html',
  styleUrls: ['./novels.component.css']
})
export class NovelsComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  public collection : string;
  public title : string;
  public headers : Array<string> = ["id", "título", "capítulos"];
  public model : Array<string> = ["id", "title", "chapters"]

  ngOnInit(): void {
    this.getCollectionName();
  }

  getCollectionName(){
    let catalog = this.router.url.split("/")[this.router.url.split("/").length - 1];
    this.title = `Novelas ${catalog}`;
    this.collection = `/${catalog}`;
  }

}
