import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators';
import { CoverService } from '../../core/services/cover/cover.service';


@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  constructor(
    private cs : CoverService,
    private router: Router
  ) { }

  public coverUrl : string = "https://cdn.wallpapersafari.com/7/69/dxBmov.jpg";
  public title: string = "Inicio";

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.title = this.cs.getTitle(event.url);
      }
    });
  }
}
