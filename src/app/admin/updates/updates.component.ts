import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent implements OnInit {

  constructor() { }

  public collection : string = "updates";
  public title : string = "Actualizaciones recientes"
  public headers : Array<string> = ["Id", "Novela", "Fecha"];
  public model : Array<string> = ["id", "title", "date"];

  ngOnInit(): void {
  }

}
