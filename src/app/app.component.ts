import { Component, OnInit } from '@angular/core';
import { ThemifyService } from './core/services/themify/themify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  

  constructor(
    private theme: ThemifyService
  ){ }

  ngOnInit(){

  }

}
