import { Component, OnInit } from '@angular/core';
import { MenuOption } from 'src/app/core/menu.option';
import { ActivityService } from 'src/app/core/services/activity/activity.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private as : ActivityService
  ) { 
    this.getActivityLog();
    this.setBasicData();
  }

  public headers : Array<string>;
  public model :  Array<string>;
  public data : Array<any>;
  public page : number = 1;
  public maxPage : number;
  public title : string;
  public pageSize : number = 5;
  private lowestId : number;

  ngOnInit(): void { }

  getActivityLog(){
    this.as.getActivityLog(this.pageSize)
    .then(collection => {
      this.data = collection;
      this.getMaxPage();
    })
    .catch(error => {
      console.log(error);
    })
  }

  setBasicData(){
    this.title = "Registro de actividad";
    this.headers = ["Id", "título", "fecha"]
    this.model = ["id", "title", "date"];
  }

  getMaxPage(){
    let maxId = this.data[0].id;
    this.maxPage = Math.ceil(maxId/5);
  }

  nextPage(){
    this.page++;
    this.getPage();
  }

  previousPage(){
    this.page--;
    this.getPage();
  }

  getPage(){
    this.as.getActivityLog(this.pageSize, this.page)
    .then(collection => {
      console.log(collection)
    })
    .catch(error => {
      console.log(error);
    })
  }
}