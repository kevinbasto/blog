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
  }

  public headers : Array<string>;
  public model :  Array<string>;
  public data : Array<any>;
  public page : number = 1;
  public maxPage : number;

  ngOnInit(): void { }

  getActivityLog(){
    this.as.getActivityLog(this.page)
    .then(collection => {
      this.data = collection;
    })
    .catch(error => {
      console.log(error);
    })
  }

}
