import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TableService } from 'src/app/core/services/table/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(
    private table : TableService,
    private router: Router
  ) { }

  @Input() collection : string;
  @Input() title : string;
  @Input() headers : Array<string>;
  @Input() model : Array<string>;

  // what is showed in the document
  public data : Array<any>;

  public page : number;
  public maxPage : number;
  public pageSize : number;
  

  ngOnInit(): void {
    this.setCollection();
    this.setPage(0);
    this.setPageSize(5);
    this.next();
  }

  setCollection(){
    this.table.setCollection(this.collection);
  }

  setPage(page : number){
    this.page = page;
  }

  setPageSize(pageSize : number){
    this.pageSize = pageSize;
  }

  previous(){
    this.setPage(this.page - 1)
    this.getData();
  }

  next(){
    this.setPage(this.page + 1);
    this.getData();
  }

  getData(){
    this.table.getData(this.page, this.pageSize)
    .then((page : Array<any>) => {
      page.map(record => {
        record.url = this.generateUrl(record.url);
      })
      this.data = page;
    })
    .catch(error => {
      console.log(error);
    })
  }

  generateUrl(url : string){
    if(url.includes("/admin")){
      return url;
    }else{
      url = '/admin' + url;
      return url;
    }
  }

  navigate(url : string){
    this.router.navigate([url]);
  }
}
