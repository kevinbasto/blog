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
    private gs: GenresService,
    private router: Router
  ) {
    this.getFirstPage();
  }

  // all the loading stuff
  public loading = true;

  // all the page data
  public title : string = "Novelas ";
  public novels: Array<any>;
  public smallestId : number;
  public genre: string;

  ngOnInit(): void { }

  async getFirstPage() {
    await this.gs.genre$.subscribe(genre => {
      this.genre = genre;
      this.title = "Novelas ";
      this.title += genre;
      
      this.gs.getPage(this.genre)
      .then(page => {
        this.novels = page;
        if(page.length != 0){
          this.smallestId = this.novels[this.novels.length-1].id;
        }
        this.loading = false;   
      })
      .catch(error => console.error(error));
    });
  }

  async getNextPage(){
    this.loading = true;
    this.gs.getPage(this.genre, this.smallestId)
    .then(page => {
      for(let novel of page){
        this.novels.push(novel);
      }
      this.smallestId = this.novels[this.novels.length-1].id;
      this.loading = false;
    })
    .catch(error => console.error(error));
  }
}