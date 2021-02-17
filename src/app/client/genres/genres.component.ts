import { Component, OnInit } from '@angular/core';
import { GenresService } from '../../core/services/genres/genres.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  constructor(
    private gs : GenresService,
    private router: Router
  ) { 
    this.getNovelsByGenre();
  }

  public novels : Array<any>;
  public page : number = 1;
  public genre : string;

  ngOnInit(): void { }

  getNovelsByGenre(){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        let tokens = event.url.split("/");
        let genre = tokens[tokens.length-1];
        this.gs.getCollection(genre)
        .then(novels => {
          this.novels = novels;
        })
        .catch(error => {
          console.error(error);
        });
      }
    });
  }
}