import { Component, OnChanges, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TableService } from 'src/app/core/services/table/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(
    private ts : TableService,
    private router: Router
  ) {
    
  }

  
  public table = this.router.events
  .pipe(filter(event => event instanceof NavigationEnd))
  .subscribe((event : any) => {
    console.log(event.url);
  })
  public title : string;
  public headers : Array<string>;
  public model : Array<string>;
  public data : Array<any>;
  public page : number;

  ngOnInit(): void {
  }


  getTable(){
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event : any) => {
      console.log(event.url);
    })
    // this.ts.table.subscribe(table => {
    //   console.log(table);
    //   this.title = this.ts.title;
    //   this.headers = this.ts.headers;
    //   this.model = this.ts.model;
    //   this.page = this.ts.page;
    //   this.getData(true);
    // })
  }

  previous(){
    this.page--;
    this.getData(false);
  }

  next(){
    this.page++;
    this.getData(true);
  }

  getData(forward : boolean){
    this.ts.getPageData(forward)
    .then(value => {
      this.page = this.ts.page;
    });
  }
}